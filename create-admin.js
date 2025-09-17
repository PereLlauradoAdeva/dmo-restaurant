const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function createAdminUser() {
  console.log('🔑 Creating admin user...')

  const adminEmail = 'admin@restaurant.com'
  const adminPassword = 'admin123456'

  try {
    // Create user with service role key (bypasses email confirmation)
    const { data, error } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true
    })

    if (error) {
      console.error('❌ Error creating admin user:', error.message)
      return
    }

    console.log('✅ Admin user created successfully!')
    console.log('📧 Email:', adminEmail)
    console.log('🔒 Password:', adminPassword)
    console.log('🆔 User ID:', data.user?.id)

    console.log('\n🎉 Ready to use!')
    console.log('1. Go to http://localhost:3002/admin')
    console.log('2. Login with the credentials above')
    console.log('3. Start managing your restaurant menu!')

  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

createAdminUser()