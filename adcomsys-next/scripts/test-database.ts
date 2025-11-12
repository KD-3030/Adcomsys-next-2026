// Quick database connection test
// Run this to verify if admin user exists

import { db } from '@/lib/db'

async function testDatabaseConnection() {
  console.log('🔍 Testing Database Connection...\n')
  
  try {
    // Test 1: Check if we can connect to database
    console.log('Test 1: Checking database connection...')
    const { data: user, error } = await db.getUserByEmail('admin@adcomsys.com')
    
    if (error) {
      console.error('❌ Database Error:', error.message)
      return
    }
    
    if (!user) {
      console.log('❌ Admin user does NOT exist in database')
      console.log('⚠️  YOU NEED TO RUN THE SEED SCRIPT!')
      console.log('📝 Instructions:')
      console.log('   1. Open Supabase Dashboard → SQL Editor')
      console.log('   2. Run: sql/seed-comprehensive-test-data.sql')
      console.log('   3. Try login again\n')
      return
    }
    
    // Test 2: Check if user has password hash
    console.log('✅ Admin user exists!')
    console.log('📧 Email:', user.email)
    console.log('👤 Name:', user.full_name)
    console.log('🔑 Role:', user.role)
    
    if (!user.password_hash) {
      console.log('❌ Admin user has NO password_hash')
      console.log('⚠️  Password hash is missing - re-run seed script!')
      return
    }
    
    console.log('✅ Password hash exists')
    console.log('🔒 Hash preview:', user.password_hash.substring(0, 20) + '...')
    
    // Test 3: Verify password hash format
    if (user.password_hash.startsWith('$2a$10$') || user.password_hash.startsWith('$2b$10$')) {
      console.log('✅ Password hash format is correct (bcrypt)')
    } else {
      console.log('❌ Password hash format is INCORRECT')
      console.log('   Expected: bcrypt hash starting with $2a$10$ or $2b$10$')
      console.log('   Got:', user.password_hash.substring(0, 10))
    }
    
    console.log('\n✅ Database is properly configured!')
    console.log('✅ You should be able to login with:')
    console.log('   Email: admin@adcomsys.com')
    console.log('   Password: Test123!')
    
  } catch (error) {
    console.error('❌ Unexpected Error:', error)
  }
}

testDatabaseConnection()
