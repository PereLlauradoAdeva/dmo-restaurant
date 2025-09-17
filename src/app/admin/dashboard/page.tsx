'use client'

import { useState, useEffect } from 'react'
import { createSupabaseClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { Plus, Edit, Trash2, LogOut, Save, X, ChevronUp, ChevronDown } from 'lucide-react'

interface MenuItem {
  id: string
  name: string
  description: string | null
  price: number
  is_available: boolean
  order_position: number
  category_id: string
}

interface MenuCategory {
  id: string
  name: string
  order_position: number
  menu_items?: MenuItem[]
}

export default function AdminDashboard() {
  const [categories, setCategories] = useState<MenuCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [editingCategory, setEditingCategory] = useState<MenuCategory | null>(null)
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    category_id: ''
  })
  const [newCategory, setNewCategory] = useState({ name: '' })
  const [showNewItemForm, setShowNewItemForm] = useState(false)
  const [showNewCategoryForm, setShowNewCategoryForm] = useState(false)

  const router = useRouter()
  const supabase = createSupabaseClient()

  useEffect(() => {
    fetchMenuData()
  }, [])

  const fetchMenuData = async () => {
    const { data, error } = await supabase
      .from('menu_categories')
      .select(`
        *,
        menu_items(*)
      `)
      .order('order_position')
      .order('order_position', { referencedTable: 'menu_items' })

    if (error) {
      console.error('Error fetching menu:', error)
    } else {
      setCategories(data || [])
    }
    setLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin')
  }

  const handleDeleteItem = async (itemId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este elemento?')) {
      const { error } = await supabase
        .from('menu_items')
        .delete()
        .eq('id', itemId)

      if (!error) {
        fetchMenuData()
      }
    }
  }

  const handleDeleteCategory = async (categoryId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta categoría? Se eliminarán todos sus elementos.')) {
      const { error } = await supabase
        .from('menu_categories')
        .delete()
        .eq('id', categoryId)

      if (!error) {
        fetchMenuData()
      }
    }
  }

  const handleSaveItem = async () => {
    if (!editingItem) return

    const { error } = await supabase
      .from('menu_items')
      .update({
        name: editingItem.name,
        description: editingItem.description,
        price: editingItem.price,
        is_available: editingItem.is_available
      })
      .eq('id', editingItem.id)

    if (!error) {
      setEditingItem(null)
      fetchMenuData()
    }
  }

  const handleSaveCategory = async () => {
    if (!editingCategory) return

    const { error } = await supabase
      .from('menu_categories')
      .update({
        name: editingCategory.name
      })
      .eq('id', editingCategory.id)

    if (!error) {
      setEditingCategory(null)
      fetchMenuData()
    }
  }

  const handleCreateItem = async () => {
    if (!newItem.name || !newItem.price || !newItem.category_id) return

    const { error } = await supabase
      .from('menu_items')
      .insert({
        name: newItem.name,
        description: newItem.description || null,
        price: parseFloat(newItem.price),
        category_id: newItem.category_id,
        is_available: true,
        order_position: 0
      })

    if (!error) {
      setNewItem({ name: '', description: '', price: '', category_id: '' })
      setShowNewItemForm(false)
      fetchMenuData()
    }
  }

  const handleCreateCategory = async () => {
    if (!newCategory.name) return

    const { error } = await supabase
      .from('menu_categories')
      .insert({
        name: newCategory.name,
        order_position: categories.length
      })

    if (!error) {
      setNewCategory({ name: '' })
      setShowNewCategoryForm(false)
      fetchMenuData()
    }
  }

  const moveCategoryUp = async (categoryId: string) => {
    const currentIndex = categories.findIndex(cat => cat.id === categoryId)
    if (currentIndex <= 0) return // Already at top

    const newCategories = [...categories]
    const [item] = newCategories.splice(currentIndex, 1)
    newCategories.splice(currentIndex - 1, 0, item)

    // Update order_position for affected categories
    await updateCategoryPositions(newCategories)
  }

  const moveCategoryDown = async (categoryId: string) => {
    const currentIndex = categories.findIndex(cat => cat.id === categoryId)
    if (currentIndex >= categories.length - 1) return // Already at bottom

    const newCategories = [...categories]
    const [item] = newCategories.splice(currentIndex, 1)
    newCategories.splice(currentIndex + 1, 0, item)

    // Update order_position for affected categories
    await updateCategoryPositions(newCategories)
  }

  const updateCategoryPositions = async (newCategories: MenuCategory[]) => {
    const updates = newCategories.map((category, index) => ({
      id: category.id,
      order_position: index
    }))

    for (const update of updates) {
      await supabase
        .from('menu_categories')
        .update({ order_position: update.order_position })
        .eq('id', update.id)
    }

    fetchMenuData()
  }

  const moveItemUp = async (itemId: string, categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId)
    if (!category?.menu_items) return

    const currentIndex = category.menu_items.findIndex(item => item.id === itemId)
    if (currentIndex <= 0) return // Already at top

    const newItems = [...category.menu_items]
    const [item] = newItems.splice(currentIndex, 1)
    newItems.splice(currentIndex - 1, 0, item)

    await updateItemPositions(newItems)
  }

  const moveItemDown = async (itemId: string, categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId)
    if (!category?.menu_items) return

    const currentIndex = category.menu_items.findIndex(item => item.id === itemId)
    if (currentIndex >= category.menu_items.length - 1) return // Already at bottom

    const newItems = [...category.menu_items]
    const [item] = newItems.splice(currentIndex, 1)
    newItems.splice(currentIndex + 1, 0, item)

    await updateItemPositions(newItems)
  }

  const updateItemPositions = async (newItems: MenuItem[]) => {
    const updates = newItems.map((item, index) => ({
      id: item.id,
      order_position: index
    }))

    for (const update of updates) {
      await supabase
        .from('menu_items')
        .update({ order_position: update.order_position })
        .eq('id', update.id)
    }

    fetchMenuData()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Cargando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Cerrar sesión
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setShowNewCategoryForm(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nueva Categoría
            </button>
            <button
              onClick={() => setShowNewItemForm(true)}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Elemento
            </button>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800 flex items-center gap-2">
              <ChevronUp size={16} className="text-blue-600" />
              <ChevronDown size={16} className="text-blue-600" />
              <span>Usa las <strong>flechas ↑↓</strong> para cambiar el orden de categorías y productos en la carta</span>
            </p>
          </div>
        </div>

        {showNewCategoryForm && (
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h3 className="text-lg font-semibold mb-4">Nueva Categoría</h3>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Nombre de la categoría"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ name: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-gray-900"
              />
              <button
                onClick={handleCreateCategory}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                <Save className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowNewCategoryForm(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {showNewItemForm && (
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h3 className="text-lg font-semibold mb-4">Nuevo Elemento</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Nombre"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-md text-gray-900"
              />
              <input
                type="text"
                placeholder="Descripción"
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-md text-gray-900"
              />
              <input
                type="number"
                step="0.01"
                placeholder="Precio"
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-md text-gray-900"
              />
              <select
                value={newItem.category_id}
                onChange={(e) => setNewItem({ ...newItem, category_id: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-md text-gray-900"
              >
                <option value="">Seleccionar categoría</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleCreateItem}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                <Save className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowNewItemForm(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        <div className="space-y-8">
          {categories.map((category, categoryIndex) => (
            <div key={category.id} className="bg-white rounded-lg shadow">
              <div className="p-6 border-b flex justify-between items-center">
                {editingCategory?.id === category.id ? (
                  <div className="flex gap-4 items-center">
                    <input
                      type="text"
                      value={editingCategory.name}
                      onChange={(e) =>
                        setEditingCategory({ ...editingCategory, name: e.target.value })
                      }
                      className="text-xl font-bold px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                    />
                    <button
                      onClick={handleSaveCategory}
                      className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setEditingCategory(null)}
                      className="px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => moveCategoryUp(category.id)}
                          disabled={categoryIndex === 0}
                          className={`p-1 rounded ${
                            categoryIndex === 0
                              ? 'text-gray-300 cursor-not-allowed'
                              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                          }`}
                          title="Mover arriba"
                        >
                          <ChevronUp size={16} />
                        </button>
                        <button
                          onClick={() => moveCategoryDown(category.id)}
                          disabled={categoryIndex === categories.length - 1}
                          className={`p-1 rounded ${
                            categoryIndex === categories.length - 1
                              ? 'text-gray-300 cursor-not-allowed'
                              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                          }`}
                          title="Mover abajo"
                        >
                          <ChevronDown size={16} />
                        </button>
                      </div>
                      <h2 className="text-xl font-bold text-gray-900">{category.name}</h2>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingCategory(category)}
                        className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                )}
              </div>

              <div className="p-6">
                {category.menu_items && category.menu_items.length > 0 ? (
                  <div className="space-y-4">
                    {category.menu_items.map((item, itemIndex) => (
                      <div key={item.id} className="border rounded-lg p-4">
                        {editingItem?.id === item.id ? (
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <input
                                type="text"
                                value={editingItem.name}
                                onChange={(e) =>
                                  setEditingItem({ ...editingItem, name: e.target.value })
                                }
                                className="px-3 py-2 border border-gray-300 rounded-md text-gray-900 font-medium"
                              />
                              <input
                                type="text"
                                value={editingItem.description || ''}
                                onChange={(e) =>
                                  setEditingItem({ ...editingItem, description: e.target.value })
                                }
                                className="px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                                placeholder="Descripción"
                              />
                              <input
                                type="number"
                                step="0.01"
                                value={editingItem.price}
                                onChange={(e) =>
                                  setEditingItem({ ...editingItem, price: parseFloat(e.target.value) })
                                }
                                className="px-3 py-2 border border-gray-300 rounded-md text-gray-900 font-medium"
                              />
                            </div>
                            <div className="flex items-center gap-4">
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={editingItem.is_available}
                                  onChange={(e) =>
                                    setEditingItem({ ...editingItem, is_available: e.target.checked })
                                  }
                                  className="mr-2"
                                />
                                Disponible
                              </label>
                              <button
                                onClick={handleSaveItem}
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                              >
                                <Save className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setEditingItem(null)}
                                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-between items-start">
                            <div className="flex items-start gap-3 flex-1">
                              <div className="flex flex-col gap-1 pt-1">
                                <button
                                  onClick={() => moveItemUp(item.id, category.id)}
                                  disabled={itemIndex === 0}
                                  className={`p-1 rounded ${
                                    itemIndex === 0
                                      ? 'text-gray-300 cursor-not-allowed'
                                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                  }`}
                                  title="Mover arriba"
                                >
                                  <ChevronUp size={14} />
                                </button>
                                <button
                                  onClick={() => moveItemDown(item.id, category.id)}
                                  disabled={itemIndex === (category.menu_items?.length || 1) - 1}
                                  className={`p-1 rounded ${
                                    itemIndex === (category.menu_items?.length || 1) - 1
                                      ? 'text-gray-300 cursor-not-allowed'
                                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                  }`}
                                  title="Mover abajo"
                                >
                                  <ChevronDown size={14} />
                                </button>
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-lg">
                                  {item.name}
                                  {!item.is_available && (
                                    <span className="ml-2 text-red-600 text-sm">(No disponible)</span>
                                  )}
                                </h3>
                                {item.description && (
                                  <p className="text-gray-600 mt-1">{item.description}</p>
                                )}
                                <p className="text-lg font-bold mt-2">€{item.price.toFixed(2)}</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => setEditingItem(item)}
                                className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteItem(item.id)}
                                className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    No hay elementos en esta categoría
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}