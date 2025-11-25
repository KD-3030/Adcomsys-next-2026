#!/usr/bin/env node

/**
 * Seed Organizing Committee Data
 * 
 * This script populates the organizing committee data in the Supabase database.
 * 
 * Usage:
 *   node scripts/seed-organizing-committee.js
 * 
 * Requirements:
 *   - NEXT_PUBLIC_SUPABASE_URL environment variable
 *   - SUPABASE_SERVICE_ROLE_KEY environment variable
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local file
let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
let supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// If not in environment, try to load from .env.local
if (!supabaseUrl || !supabaseServiceKey) {
  try {
    const envPath = path.join(__dirname, '..', '.env.local');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      const lines = envContent.split('\n');
      
      lines.forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const [key, ...valueParts] = trimmed.split('=');
          const value = valueParts.join('=').trim().replace(/^["']|["']$/g, '');
          
          if (key === 'NEXT_PUBLIC_SUPABASE_URL') {
            supabaseUrl = value;
          } else if (key === 'SUPABASE_SERVICE_ROLE_KEY') {
            supabaseServiceKey = value;
          }
        }
      });
    }
  } catch {
    // Ignore errors, will be caught by validation below
  }
}

console.log('\n========================================');
console.log('Organizing Committee Data Seeding Script');
console.log('========================================\n');

// Validate environment variables
if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ ERROR: Supabase credentials not found!');
  console.error('\nPlease ensure the following environment variables are set in .env.local:');
  console.error('  - NEXT_PUBLIC_SUPABASE_URL');
  console.error('  - SUPABASE_SERVICE_ROLE_KEY\n');
  process.exit(1);
}

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseServiceKey);

console.log('✓ Supabase client initialized');
console.log(`✓ Project URL: ${supabaseUrl}\n`);

// Committee data
const committeeMembers = [
  // Chief Patron
  { name: 'Prof. Banani Chakrabarti', designation: 'Chancellor', affiliation: 'University of Engineering & Management, Kolkata', display_order: 1 },
  
  // Patrons
  { name: 'Prof. Dr. Sajal Dasgupta', designation: 'Vice Chancellor', affiliation: 'University of Engineering & Management, Kolkata', display_order: 2 },
  { name: 'Prof. Dr. Satyajit Chakrabarti', designation: 'Pro Vice Chancellor', affiliation: 'University of Engineering & Management, Kolkata', display_order: 3 },
  { name: 'Prof. Dr. Sukalyan Goswami', designation: 'Registrar', affiliation: 'University of Engineering & Management, Kolkata', display_order: 4 },
  { name: 'Prof. Dr. Rajashree Paul', designation: 'Deputy-Dean (Research), Director(IQAC)', affiliation: 'University of Engineering & Management, Kolkata', display_order: 5 },
  { name: 'Prof. Dr. Kamakhya Prasad Ghatak', designation: 'Dean-Engineering', affiliation: 'University of Engineering & Management, Kolkata', display_order: 6 },
  { name: 'Prof. Dr. Rajiv Ganguly', designation: 'Dean-Science', affiliation: 'University of Engineering & Management, Kolkata', display_order: 7 },
  { name: 'Prof. Dr. Abir Chatterjee', designation: 'Dean-Research', affiliation: 'University of Engineering and Management, Kolkata', display_order: 8 },
  
  // General Chairs
  { name: 'Prof. Dr. Weiping Ding', designation: 'General Chair - Deputy Dean of School of Information Science and Technology', affiliation: 'Nantong University, Nantong, Jiangsu, China', display_order: 9 },
  { name: 'Prof. Dr. Amlan Chakrabarti', designation: 'General Chair', affiliation: 'A.K.Choudhury School of Information Technology, University of Calcutta', display_order: 10 },
  { name: 'Prof. Dr. Maumita Chakraborty', designation: 'General Chair - Department of Computer Science and Technology & Computer Science and Information Technology', affiliation: 'University of Engineering and Management, Kolkata', display_order: 11 },
  { name: 'Prof. Dr. Shouvik Chakraborty', designation: 'General Chair - Department of Computer Science & Technology', affiliation: 'Government of West Bengal, Chandannagar, Hooghly, West Bengal, India', display_order: 12 },
  
  // Co-Convenors
  { name: 'Prof. Dr. Subhalaxmi Chakraborty', designation: 'Co-Convenor', affiliation: 'University of Engineering and Management, Kolkata', display_order: 14 },
  { name: 'Prof. Dr. Sudipta Basu Pal', designation: 'Co-Convenor', affiliation: 'University of Engineering and Management, Kolkata', display_order: 15 },
  { name: 'Prof. Dr. Chiradeep Mukherjee', designation: 'Co-Convenor', affiliation: 'University of Engineering and Management, Kolkata', display_order: 16 },
  
  // Technical Chairs
  { name: 'Prof. Dr. Danilo Pelusi', designation: 'Technical Chair', affiliation: 'University of Teramo, Faculty of Communication Sciences, Teramo, Italy', display_order: 17 },
  { name: 'Prof. Dr. Asit Kumar Das', designation: 'Technical Chair', affiliation: 'Department of Computer Science and Technology, Indian Institute of Engineering Science and Technology, Shibpur', display_order: 18 },
  
  // Finance Chair
  { name: 'Mr. Indranil Banerjee', designation: 'Finance Chair', affiliation: 'University of Engineering and Management Kolkata', display_order: 20 },
  
  // Organizing Members
  { name: 'Prof. Dr. Srilekha Mukherjee', designation: 'Organizing Member', affiliation: 'University of Engineering and Management Kolkata', display_order: 21 },
  { name: 'Prof. Dr. Anirban Ganguly', designation: 'Organizing Member', affiliation: 'University of Engineering and Management Kolkata', display_order: 22 },
  { name: 'Prof. Dr. Subhrangshu Das', designation: 'Organizing Member', affiliation: 'University of Engineering and Management Kolkata', display_order: 23 },
  { name: 'Prof. Dr. Debanjana Datta Mitra', designation: 'Organizing Member', affiliation: 'University of Engineering and Management Kolkata', display_order: 24 },
  { name: 'Prof. Pradipta Sarkar', designation: 'Organizing Member', affiliation: 'University of Engineering and Management Kolkata', display_order: 25 },
  { name: 'Prof. Sanjukta Mishra', designation: 'Organizing Member', affiliation: 'University of Engineering and Management Kolkata', display_order: 26 },
  { name: 'Prof. Kamalika Bhowal', designation: 'Organizing Member', affiliation: 'University of Engineering and Management Kolkata', display_order: 27 },
  { name: 'Prof. Dr. Suvaditya Majumdar', designation: 'Organizing Member', affiliation: 'University of Engineering and Management Kolkata', display_order: 28 },
  { name: 'Prof. Ayan Das', designation: 'Organizing Member', affiliation: 'University of Engineering and Management Kolkata', display_order: 29 },
  { name: 'Prof. Arpita Saha Chowdhury', designation: 'Organizing Member', affiliation: 'University of Engineering and Management Kolkata', display_order: 30 },
  { name: 'Prof. Ritika Pramanick', designation: 'Organizing Member', affiliation: 'University of Engineering and Management Kolkata', display_order: 31 }
];

async function seedCommitteeData() {
  try {
    console.log('📝 Preparing to seed committee data...');
    console.log(`   Total members to insert: ${committeeMembers.length}\n`);

    // Delete existing organizing committee data
    console.log('🗑️  Clearing existing organizing committee data...');
    const { error: deleteError } = await supabase
      .from('committee_members')
      .delete()
      .eq('committee_type', 'organizing');

    if (deleteError) {
      console.error('❌ Error deleting existing data:', deleteError);
      throw deleteError;
    }
    console.log('✓ Existing data cleared\n');

    // Insert new data
    console.log('💾 Inserting new committee members...');
    const membersToInsert = committeeMembers.map(member => ({
      ...member,
      email: '',
      committee_type: 'organizing',
      is_active: true
    }));

    const { data, error } = await supabase
      .from('committee_members')
      .insert(membersToInsert)
      .select();

    if (error) {
      console.error('❌ Error inserting data:', error);
      throw error;
    }

    console.log(`✓ Successfully inserted ${data.length} members\n`);

    // Verify the data
    console.log('🔍 Verifying inserted data...');
    const { data: verifyData, error: verifyError } = await supabase
      .from('committee_members')
      .select('name, designation, display_order')
      .eq('committee_type', 'organizing')
      .order('display_order');

    if (verifyError) {
      console.error('❌ Error verifying data:', verifyError);
      throw verifyError;
    }

    console.log(`✓ Verified ${verifyData.length} members in database\n`);

    // Success message
    console.log('========================================');
    console.log('✅ SUCCESS! Committee Data Seeded');
    console.log('========================================\n');
    console.log('Next Steps:');
    console.log('1. Visit your website at /committee to see the data');
    console.log('2. Verify in Supabase dashboard: Table Editor → committee_members');
    console.log('3. Use the admin panel to manage committee members\n');

    // Summary
    console.log('📊 Summary:');
    console.log(`   Chief Patron: 1`);
    console.log(`   Patrons: 7`);
    console.log(`   General Chairs: 4`);
    console.log(`   Co-Convenors: 3`);
    console.log(`   Technical Chairs: 2`);
    console.log(`   Finance Chair: 1`);
    console.log(`   Organizing Members: 11`);
    console.log(`   ──────────────────`);
    console.log(`   Total: ${verifyData.length} members\n`);

  } catch (error) {
    console.error('\n❌ Seeding failed!');
    console.error('Error:', error.message);
    console.error('\nManual Alternative:');
    console.error('1. Go to: https://app.supabase.com');
    console.error('2. Open your project');
    console.error('3. Navigate to SQL Editor');
    console.error('4. Copy and paste: sql/seed-organizing-committee.sql');
    console.error('5. Run the SQL commands\n');
    process.exit(1);
  }
}

// Run the seeding function
seedCommitteeData();
