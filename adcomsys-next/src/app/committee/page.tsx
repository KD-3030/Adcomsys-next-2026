import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Users, Crown, Award, Briefcase, Mail, Building } from 'lucide-react'
import { supabaseAdmin } from '@/lib/db'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

// Committee Member Component
interface CommitteeMemberProps {
  name: string
  designation: string
  affiliation: string
  email?: string
  role?: string
  level?: 'chief' | 'patron' | 'chair' | 'member'
  image_url?: string | null
}

interface CommitteeMemberData {
  id: string
  name: string
  designation: string
  affiliation: string
  email: string
  committee_type: 'organizing' | 'technical' | 'advisory'
  display_order: number
  is_active: boolean
  image_url: string | null
}

function CommitteeMember({ name, designation, affiliation, email, role = '', level = 'member', image_url }: CommitteeMemberProps) {
  const levelColors = {
    chief: 'bg-gradient-to-r from-yellow-500 to-orange-500',
    patron: 'bg-gradient-to-r from-blue-600 to-indigo-600',
    chair: 'bg-gradient-to-r from-green-600 to-teal-600',
    member: 'bg-gradient-to-r from-gray-600 to-gray-700'
  }

  const levelIcons = {
    chief: Crown,
    patron: Award,
    chair: Briefcase,
    member: Users
  }

  const Icon = levelIcons[level]

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-l-4 border-[#fca311] shadow-md">
      <div className={`${levelColors[level]} h-2`}></div>
      <CardContent className="p-6 bg-gradient-to-br from-white to-gray-50">
        <div className="flex items-start gap-4">
          {image_url ? (
            <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-blue-200">
              <Image
                src={image_url}
                alt={name}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
          ) : (
            <div className={`${levelColors[level]} p-3 rounded-lg flex-shrink-0`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                {role && (
                  <Badge variant="secondary" className="mb-2 font-medium">
                    {role}
                  </Badge>
                )}
                <h3 className="text-xl font-bold text-gray-900">{name}</h3>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-700 flex items-center gap-2 mt-2">
              <Briefcase className="h-4 w-4 text-[#fca311]" />
              {designation}
            </p>
            <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
              <Building className="h-4 w-4 text-gray-500" />
              {affiliation}
            </p>
            {email && (
              <p className="text-sm text-[#fca311] flex items-center gap-2 mt-2">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${email}`} className="hover:underline hover:text-[#ff9800] transition-colors">{email}</a>
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Hardcoded Technical Committee
const technicalCommitteeData: CommitteeMemberData[] = [
  { id: 't1', name: 'Prof. (Dr.) Rajat Kumar Pal', designation: 'TPC Member', affiliation: 'University of Calcutta, Kolkata, India', email: '', committee_type: 'technical', display_order: 1, is_active: true, image_url: null },
  { id: 't2', name: 'Prof. (Dr.) Mokbul Morshed Ahmad', designation: 'TPC Member', affiliation: 'Asian Institute of Technology, Thailand', email: '', committee_type: 'technical', display_order: 2, is_active: true, image_url: null },
  { id: 't3', name: 'Prof. (Dr.) Nabendu Chaki', designation: 'TPC Member', affiliation: 'University of Calcutta, India', email: '', committee_type: 'technical', display_order: 3, is_active: true, image_url: null },
  { id: 't4', name: 'Prof. (Dr.) Mohd Syuhaimi Ab Rahman', designation: 'TPC Member', affiliation: 'National University of Malaysia, Malaysia', email: '', committee_type: 'technical', display_order: 4, is_active: true, image_url: null },
  { id: 't5', name: 'Prof. (Dr.) Rajitha B', designation: 'TPC Member', affiliation: 'Motilal Nehru National Institute of Technology Allahabad, Prayagraj, India', email: '', committee_type: 'technical', display_order: 5, is_active: true, image_url: null },
  { id: 't6', name: 'Prof. (Dr.) Shirley Devapriya Dewasurendra', designation: 'TPC Member', affiliation: 'University of Peradeniya, Sri Lanka', email: '', committee_type: 'technical', display_order: 6, is_active: true, image_url: null },
  { id: 't7', name: 'Prof. (Dr.) Anirban Mukhopadhyay', designation: 'TPC Member', affiliation: 'University of Kalyani, Kalyani, India', email: '', committee_type: 'technical', display_order: 7, is_active: true, image_url: null },
  { id: 't8', name: 'Prof. (Mr.) Bidit Pakrashi', designation: 'TPC Member', affiliation: 'Comcast, USA', email: '', committee_type: 'technical', display_order: 8, is_active: true, image_url: null },
  { id: 't9', name: 'Prof. (Dr.) Debashish De', designation: 'TPC Member', affiliation: 'Maulana Abul Kalam Azad University of Technology, West Bengal', email: '', committee_type: 'technical', display_order: 9, is_active: true, image_url: null },
  { id: 't10', name: 'Prof. (Dr.) Sheng-Lung Peng', designation: 'TPC Member', affiliation: 'National Dong Hwa University, Hualien, Taiwan', email: '', committee_type: 'technical', display_order: 10, is_active: true, image_url: null },
  { id: 't11', name: 'Prof. (Dr.) Indrajit Banerjee', designation: 'TPC Member', affiliation: 'Indian Institute of Engineering Science and Technology, Shibpur, India', email: '', committee_type: 'technical', display_order: 11, is_active: true, image_url: null },
  { id: 't12', name: 'Prof. (Dr.) Shivendra Shivani', designation: 'TPC Member', affiliation: 'Thapar University, Patiala', email: '', committee_type: 'technical', display_order: 12, is_active: true, image_url: null },
  { id: 't13', name: 'Prof. (Dr.) Ekramul Hamid', designation: 'TPC Member', affiliation: 'Thapar University, Patiala', email: '', committee_type: 'technical', display_order: 13, is_active: true, image_url: null },
  { id: 't14', name: 'Prof. (Dr.) Chintan Kumar Mandal', designation: 'TPC Member', affiliation: 'Jadavpur University', email: '', committee_type: 'technical', display_order: 14, is_active: true, image_url: null },
  { id: 't15', name: 'Prof. (Dr.) Media Anugerah Ayu', designation: 'TPC Member', affiliation: 'Sampoerna University, Indonesia', email: '', committee_type: 'technical', display_order: 15, is_active: true, image_url: null },
  { id: 't16', name: 'Prof. (Dr.) Santi Prasad Maity', designation: 'TPC Member', affiliation: 'Indian Institute of Engineering Science and Technology, Shibpur, India', email: '', committee_type: 'technical', display_order: 16, is_active: true, image_url: null },
  { id: 't17', name: 'Prof. (Dr.) Fatima Isiaka', designation: 'TPC Member', affiliation: 'Sheffield Halam University, United Kingdom', email: '', committee_type: 'technical', display_order: 17, is_active: true, image_url: null },
  { id: 't18', name: 'Prof. (Dr.) Peter Loh Kok Keong', designation: 'TPC Member', affiliation: 'Nanyang Technological University, Singapore', email: '', committee_type: 'technical', display_order: 18, is_active: true, image_url: null },
  { id: 't19', name: 'Prof. (Dr.) Asish Kumar Mukhopadhyay', designation: 'TPC Member', affiliation: 'Professor Emeritus, IET, Bundelkhand University, Jhansi, U.P', email: '', committee_type: 'technical', display_order: 19, is_active: true, image_url: null },
  { id: 't20', name: 'Prof. (Dr.) Apurba Sarkar', designation: 'TPC Member', affiliation: 'Indian Institute of Engineering Science and Technology, Shibpur, India', email: '', committee_type: 'technical', display_order: 20, is_active: true, image_url: null },
  { id: 't21', name: 'Prof. (Dr.) Jaya Sil', designation: 'TPC Member', affiliation: 'Indian Institute of Engineering Science and Technology, Shibpur, India', email: '', committee_type: 'technical', display_order: 21, is_active: true, image_url: null },
  { id: 't22', name: 'Prof. (Dr.) Hamid Abdullah Jalab al-Tulea', designation: 'TPC Member', affiliation: 'University of Malaya, Kuala Lumpur, Malaysia', email: '', committee_type: 'technical', display_order: 22, is_active: true, image_url: null },
  { id: 't23', name: 'Prof. (Dr.) Chang-Biau Yang', designation: 'TPC Member', affiliation: 'University of Malaya, Kuala Lumpur, Malaysia', email: '', committee_type: 'technical', display_order: 23, is_active: true, image_url: null },
  { id: 't24', name: 'Prof. (Dr.) Surajit Kumar Roy', designation: 'TPC Member', affiliation: 'Indian Institute of Engineering Science and Technology, Shibpur, India', email: '', committee_type: 'technical', display_order: 24, is_active: true, image_url: null },
  { id: 't25', name: 'Prof. (Dr.) Lei Zhu', designation: 'TPC Member', affiliation: 'National Renewable Energy Laboratory, USA', email: '', committee_type: 'technical', display_order: 25, is_active: true, image_url: null },
  { id: 't26', name: 'Prof. (Dr.) Nidul Sinha', designation: 'TPC Member', affiliation: 'National Institute of Technology, Silchar, Assam, India', email: '', committee_type: 'technical', display_order: 26, is_active: true, image_url: null },
  { id: 't27', name: 'Prof. (Dr.) Annapa B', designation: 'TPC Member', affiliation: 'National Institute of Technology Karnataka, Surathkal, India', email: '', committee_type: 'technical', display_order: 27, is_active: true, image_url: null },
  { id: 't28', name: 'Prof. (Dr.) Malay Kule', designation: 'TPC Member', affiliation: 'Indian Institute of Engineering Science and Technology, Shibpur, India', email: '', committee_type: 'technical', display_order: 28, is_active: true, image_url: null },
  { id: 't29', name: 'Prof. (Dr.) Sankhayan Choudhury', designation: 'TPC Member', affiliation: 'University of Calcutta, India', email: '', committee_type: 'technical', display_order: 29, is_active: true, image_url: null },
  { id: 't30', name: 'Prof. (Dr.) Sunirmal Khatua', designation: 'TPC Member', affiliation: 'University of Calcutta, India', email: '', committee_type: 'technical', display_order: 30, is_active: true, image_url: null },
  { id: 't31', name: 'Prof. (Dr.) Pritha Banerjee', designation: 'TPC Member', affiliation: 'University of Calcutta, India', email: '', committee_type: 'technical', display_order: 31, is_active: true, image_url: null },
  { id: 't32', name: 'Prof. (Dr.) Rajib Das', designation: 'TPC Member', affiliation: 'University of Calcutta, India', email: '', committee_type: 'technical', display_order: 32, is_active: true, image_url: null },
  { id: 't33', name: 'Prof. (Dr.) Bansibadan Maji', designation: 'TPC Member', affiliation: 'National Institute of Technology, Durgapur, India', email: '', committee_type: 'technical', display_order: 33, is_active: true, image_url: null },
  { id: 't34', name: 'Prof. (Dr.) Tanvi Agrawal', designation: 'TPC Member', affiliation: 'Indian Institute of Technology, Mumbai', email: '', committee_type: 'technical', display_order: 34, is_active: true, image_url: null },
  { id: 't35', name: 'Prof. (Dr.) Sahil Neelam', designation: 'TPC Member', affiliation: 'Punjab Institute of Technology Kapurthala, India', email: '', committee_type: 'technical', display_order: 35, is_active: true, image_url: null },
  { id: 't36', name: 'Prof. (Dr.) Parag Kumar Guha Thakurta', designation: 'TPC Member', affiliation: 'National Institute of Technology Durgapur, India', email: '', committee_type: 'technical', display_order: 36, is_active: true, image_url: null },
  { id: 't37', name: 'Prof. (Dr.) Abdulnasir Hossen', designation: 'TPC Member', affiliation: 'Sultan Qaboos University, Oman', email: '', committee_type: 'technical', display_order: 37, is_active: true, image_url: null },
  { id: 't38', name: 'Prof. (Dr.) Padmalochan Bera', designation: 'TPC Member', affiliation: 'Indian Institute of Technology, Bhubaneswar', email: '', committee_type: 'technical', display_order: 38, is_active: true, image_url: null },
  { id: 't39', name: 'Prof. (Dr.) Himadri Shekhar Dutta', designation: 'TPC Member', affiliation: 'Kalyani Govt. Engineering College', email: '', committee_type: 'technical', display_order: 39, is_active: true, image_url: null },
  { id: 't40', name: 'Prof. (Dr.) Ahmad Zaidi bin Abdullah', designation: 'TPC Member', affiliation: 'Universiti Malaysia Perlis, Malaysia', email: '', committee_type: 'technical', display_order: 40, is_active: true, image_url: null },
  { id: 't41', name: 'Prof. (Dr.) Roy Eagleson', designation: 'TPC Member', affiliation: 'Western University, Canada', email: '', committee_type: 'technical', display_order: 41, is_active: true, image_url: null },
  { id: 't42', name: 'Prof. (Dr.) Soumya Sen', designation: 'TPC Member', affiliation: 'University of Calcutta, India', email: '', committee_type: 'technical', display_order: 42, is_active: true, image_url: null },
  { id: 't43', name: 'Prof. (Dr.) K.K. Shukla', designation: 'TPC Member', affiliation: 'Indian Institute of Technology, Banaras Hindu University, India', email: '', committee_type: 'technical', display_order: 43, is_active: true, image_url: null },
  { id: 't44', name: 'Prof. (Dr.) Julia Johnson', designation: 'TPC Member', affiliation: 'Laurentian University, Sudbury, Ontario, Canada', email: '', committee_type: 'technical', display_order: 44, is_active: true, image_url: null },
  { id: 't45', name: 'Prof. (Dr.) Rinki Sharma Ramaiah', designation: 'TPC Member', affiliation: 'University of Applied Sciences, Karnataka, India', email: '', committee_type: 'technical', display_order: 45, is_active: true, image_url: null },
  { id: 't46', name: 'Prof. (Dr.) Tapas Si', designation: 'TPC Member', affiliation: 'University of Engineering & Management, Jaipur', email: '', committee_type: 'technical', display_order: 46, is_active: true, image_url: null },
  { id: 't47', name: 'Prof. (Dr.) Normi Sham bt. Awang Abu Bakar', designation: 'TPC Member', affiliation: 'International Islamic University, Malaysia', email: '', committee_type: 'technical', display_order: 47, is_active: true, image_url: null },
  { id: 't48', name: 'Prof. Adrian Schmidt', designation: 'TPC Member', affiliation: 'Burman University, Canada', email: '', committee_type: 'technical', display_order: 48, is_active: true, image_url: null },
  { id: 't49', name: 'Prof. (Dr.) Ke-Lin Du', designation: 'TPC Member', affiliation: 'Concordia University, Montreal, Canada', email: '', committee_type: 'technical', display_order: 49, is_active: true, image_url: null },
  { id: 't50', name: 'Prof. (Dr.) Hamed Sadat Mehrizi', designation: 'TPC Member', affiliation: 'Qazvin Azad University, Iran', email: '', committee_type: 'technical', display_order: 50, is_active: true, image_url: null },
  { id: 't51', name: 'Prof. (Dr.) Rosli Bin Besar', designation: 'TPC Member', affiliation: 'Multimedia University, Malaysia', email: '', committee_type: 'technical', display_order: 51, is_active: true, image_url: null },
  { id: 't52', name: 'Prof. (Dr.) Saradindu Panda', designation: 'TPC Member', affiliation: 'Narula Institute of Technology Kolkata, India', email: '', committee_type: 'technical', display_order: 52, is_active: true, image_url: null },
  { id: 't53', name: 'Prof. (Dr.) Nirnay Ghosh', designation: 'TPC Member', affiliation: 'Indian Institute of Engineering Science and Technology, Shibpur, India', email: '', committee_type: 'technical', display_order: 53, is_active: true, image_url: null },
  { id: 't54', name: 'Prof. (Dr.) Indranil Chakrabarty', designation: 'TPC Member', affiliation: 'International Institute of Information Technology, Hyderabad', email: '', committee_type: 'technical', display_order: 54, is_active: true, image_url: null },
  { id: 't55', name: 'Prof. (Dr.) Arijit Banerjee', designation: 'TPC Member', affiliation: 'Federated Wireless, USA', email: '', committee_type: 'technical', display_order: 55, is_active: true, image_url: null },
  { id: 't56', name: 'Prof. (Dr.) Konika Das Bhattacharya', designation: 'TPC Member', affiliation: 'Indian Institute of Engineering Science and Technology, Shibpur, India', email: '', committee_type: 'technical', display_order: 56, is_active: true, image_url: null },
  { id: 't57', name: 'Prof. (Mr.) Sanjay Saha', designation: 'TPC Member', affiliation: 'SAMSUNG, India', email: '', committee_type: 'technical', display_order: 57, is_active: true, image_url: null },
  { id: 't58', name: 'Prof. (Dr.) Rudra Pratap Ojha', designation: 'TPC Member', affiliation: 'G. L. Bajaj Institute of Technology and Management, Greater Noida, India', email: '', committee_type: 'technical', display_order: 58, is_active: true, image_url: null },
  { id: 't59', name: 'Prof. (Dr.) Soumya Ranjan Mishra', designation: 'TPC Member', affiliation: 'School of Computer Engineering, KIIT University, Bhubaneswar, India', email: '', committee_type: 'technical', display_order: 59, is_active: true, image_url: null },
  { id: 't60', name: 'Prof. (Dr.) Dhananjoy Bhakta', designation: 'TPC Member', affiliation: 'Indian Institute of Information Technology Ranchi, India', email: '', committee_type: 'technical', display_order: 60, is_active: true, image_url: null },
  { id: 't61', name: 'Prof. (Dr.) Mandeep K. Chawla', designation: 'TPC Member', affiliation: 'MCM DAV College for Women, Chandigarh, India', email: '', committee_type: 'technical', display_order: 61, is_active: true, image_url: null },
  { id: 't62', name: 'Prof. (Dr.) Karl F. Bohringer', designation: 'TPC Member', affiliation: 'University of Washington, USA', email: '', committee_type: 'technical', display_order: 62, is_active: true, image_url: null },
  { id: 't63', name: 'Prof. (Dr.) Gitosree Khan', designation: 'TPC Member', affiliation: 'BP Poddar Institute of Management and Technology, Kolkata, India', email: '', committee_type: 'technical', display_order: 63, is_active: true, image_url: null },
  { id: 't64', name: 'Prof. (Dr.) Chandan Kumar', designation: 'TPC Member', affiliation: 'Department of Electrical Engineering, IIEST, Shibpur', email: '', committee_type: 'technical', display_order: 64, is_active: true, image_url: null },
  { id: 't65', name: 'Prof. (Dr.) Anirban Mitra', designation: 'TPC Member', affiliation: 'Department of Computer Science, Amity University, Kolkata, India', email: '', committee_type: 'technical', display_order: 65, is_active: true, image_url: null },
  { id: 't66', name: 'Prof. (Dr.) Samya Muhuri', designation: 'TPC Member', affiliation: 'Thapar Institute of Engineering and Technology, Patiala, India', email: '', committee_type: 'technical', display_order: 66, is_active: true, image_url: null },
  { id: 't67', name: 'Prof. (Dr.) Kousik Dasgupta', designation: 'TPC Member', affiliation: 'Kalyani Government Engineering College, Kalyani, Nadia, West Bengal, India', email: '', committee_type: 'technical', display_order: 67, is_active: true, image_url: null },
  { id: 't68', name: 'Prof. (Dr.) Samir Kr Borgohain', designation: 'TPC Member', affiliation: 'National Institute of Technology, Silchar, Assam, India', email: '', committee_type: 'technical', display_order: 68, is_active: true, image_url: null },
  { id: 't69', name: 'Prof. (Dr.) Rik Das', designation: 'TPC Member', affiliation: 'Xavier Institute of Social Service, India', email: '', committee_type: 'technical', display_order: 69, is_active: true, image_url: null },
  { id: 't70', name: 'Prof. (Dr.) Simon Stieber', designation: 'TPC Member', affiliation: 'University of Augsburg, UNA', email: '', committee_type: 'technical', display_order: 70, is_active: true, image_url: null },
  { id: 't71', name: 'Prof. (Dr.) Nassir Jabir Farhan AL-Khafaji', designation: 'TPC Member', affiliation: 'Technical Institute of Nasiriyah, Iraq', email: '', committee_type: 'technical', display_order: 71, is_active: true, image_url: null },
  { id: 't72', name: 'Prof. (Dr.) Bhaskar Karn', designation: 'TPC Member', affiliation: 'Birla Institute of Technology, Mesra, India', email: '', committee_type: 'technical', display_order: 72, is_active: true, image_url: null },
  { id: 't73', name: 'Prof. (Dr.) Dhruba Jyoti Bora', designation: 'TPC Member', affiliation: 'Madanapalle Institute of Technology, Chittoor, Andhra Pradesh, India', email: '', committee_type: 'technical', display_order: 73, is_active: true, image_url: null },
  { id: 't74', name: 'Prof. (Dr.) Debashree Devi', designation: 'TPC Member', affiliation: 'Indian Institute of Information Technology, Guwahati, Assam, India', email: '', committee_type: 'technical', display_order: 74, is_active: true, image_url: null },
  { id: 't75', name: 'Prof. (Mr.) Subham Bid', designation: 'TPC Member', affiliation: 'Associate at CB Tech, Deutsche Bank, Pune, India', email: '', committee_type: 'technical', display_order: 75, is_active: true, image_url: null },
  { id: 't76', name: 'Prof. (Ms.) Shirsha Chakraborty', designation: 'TPC Member', affiliation: 'Senior Software Engineer, Marsh Mclennan, USA', email: '', committee_type: 'technical', display_order: 76, is_active: true, image_url: null },
  { id: 't77', name: 'Prof. (Dr.) Sandip Das', designation: 'TPC Member', affiliation: 'Geetanjali Institute of Technical Studies, Udaipur, Rajasthan, India', email: '', committee_type: 'technical', display_order: 77, is_active: true, image_url: null },
  { id: 't78', name: 'Prof. (Dr.) Riya Sen', designation: 'TPC Member', affiliation: 'Geetanjali Institute of Technical Studies, Udaipur, Rajasthan, India', email: '', committee_type: 'technical', display_order: 78, is_active: true, image_url: null },
  { id: 't79', name: 'Prof. (Dr.) Sumana Kundu', designation: 'TPC Member', affiliation: 'Dr. B. C. Roy Engineering College, Durgapur, India', email: '', committee_type: 'technical', display_order: 79, is_active: true, image_url: null },
  { id: 't80', name: 'Prof. (Dr.) Ravi Kant Kumar', designation: 'TPC Member', affiliation: 'SRM University, Andhra Pradesh, India', email: '', committee_type: 'technical', display_order: 80, is_active: true, image_url: null },
  { id: 't81', name: 'Prof. (Dr.) Prabhat Kumar Upadhyay', designation: 'TPC Member', affiliation: 'Birla Institute of Technology, India', email: '', committee_type: 'technical', display_order: 81, is_active: true, image_url: null },
  { id: 't82', name: 'Prof. (Dr.) Ayan Banerjee', designation: 'TPC Member', affiliation: 'Indian Institute of Engineering Science and Technology, Shibpur, India', email: '', committee_type: 'technical', display_order: 82, is_active: true, image_url: null },
  { id: 't83', name: 'Prof. (Mr.) Shashwata Banerjee', designation: 'TPC Member', affiliation: 'HCL Technologies', email: '', committee_type: 'technical', display_order: 83, is_active: true, image_url: null },
  { id: 't84', name: 'Prof. (Ms.) Rishmita Saha', designation: 'TPC Member', affiliation: 'Capgemini', email: '', committee_type: 'technical', display_order: 84, is_active: true, image_url: null },
  { id: 't85', name: 'Prof. (Mr.) Aritra Dutta', designation: 'TPC Member', affiliation: 'Accenture', email: '', committee_type: 'technical', display_order: 85, is_active: true, image_url: null },
  { id: 't86', name: 'Prof. (Mr.) Aninda Sankar Shukla', designation: 'TPC Member', affiliation: 'Mindshare Global', email: '', committee_type: 'technical', display_order: 86, is_active: true, image_url: null },
  { id: 't87', name: 'Prof. (Dr.) Konika Das (Bhattacharya)', designation: 'TPC Member', affiliation: 'Professor of Department of Electrical Engineering, IIEST, Shibpur', email: '', committee_type: 'technical', display_order: 87, is_active: true, image_url: null },
  { id: 't88', name: 'Prof. (Dr.) Sovan Dalai', designation: 'TPC Member', affiliation: 'Professor, Electrical Engineering, Jadavpur University', email: '', committee_type: 'technical', display_order: 88, is_active: true, image_url: null },
  { id: 't89', name: 'Prof. (Dr.) Sivaji Chakrabortyn', designation: 'TPC Member', affiliation: 'Professor, Jadavpur University', email: '', committee_type: 'technical', display_order: 89, is_active: true, image_url: null },
  { id: 't90', name: 'Prof. (Dr.) Monojit Mitra', designation: 'TPC Member', affiliation: 'Professor Electronics and Telecommunication Engineering', email: '', committee_type: 'technical', display_order: 90, is_active: true, image_url: null },
  { id: 't91', name: 'Prof. (Dr.) Hiranmay Saha', designation: 'TPC Member', affiliation: 'Visiting Professor, School of Advanced Materials, Green Energy and Sensor Systems, IIEST, Shibpur', email: '', committee_type: 'technical', display_order: 91, is_active: true, image_url: null },
  { id: 't92', name: 'Prof. (Dr.) Partha Chaudhuri', designation: 'TPC Member', affiliation: 'Visiting Professor, School of Advanced Materials, Green Energy and Sensor Systems, IIEST, Shibpur', email: '', committee_type: 'technical', display_order: 92, is_active: true, image_url: null },
  { id: 't93', name: 'Prof. (Dr.) Syed Minhaz Hossain', designation: 'TPC Member', affiliation: 'Associate Professor, Department of Physics, IIEST, Shibpur', email: '', committee_type: 'technical', display_order: 93, is_active: true, image_url: null },
  { id: 't94', name: 'Prof. (Dr.) Sumita Mukhopadhyay', designation: 'TPC Member', affiliation: 'Assistant Professor, School of Advanced Materials, Green Energy and Sensor Systems, IIEST, Shibpur', email: '', committee_type: 'technical', display_order: 94, is_active: true, image_url: null },
  { id: 't95', name: 'Prof. (Dr.) Sujit K. Biswas', designation: 'TPC Member', affiliation: 'Dean (Academic) & Professor, Dept. of Electrical Engg., St. Thomas\' College of Engineering and Technology, Kolkata, India and Former Professor & Head, Dept. of Electrical Engg., Jadavpur University', email: '', committee_type: 'technical', display_order: 95, is_active: true, image_url: null },
  { id: 't96', name: 'Prof. (Dr.) Samarjit Sengupta', designation: 'TPC Member', affiliation: 'Ex-Professor (Applied Physics Department), University of Calcutta and Visiting Professor, School of Advanced Materials, Green Energy and Sensor Systems, IIEST Shibpur', email: '', committee_type: 'technical', display_order: 96, is_active: true, image_url: null },
  { id: 't97', name: 'Prof. (Dr.) Siddhartha Sankar Thakur', designation: 'TPC Member', affiliation: 'Professor, Department of Electrical Engineering, NIT Durgapur', email: '', committee_type: 'technical', display_order: 97, is_active: true, image_url: null },
  { id: 't98', name: 'Prof. (Dr.) Pradip Kumar Sadhu', designation: 'TPC Member', affiliation: 'Professor (HAG) and Ex-Head, Department Of Electrical Engineering, IIT (ISM), DHANBAD', email: '', committee_type: 'technical', display_order: 98, is_active: true, image_url: null },
  { id: 't99', name: 'Prof. (Dr.) Prithwiraj Purkait', designation: 'TPC Member', affiliation: 'Professor, Department of Power Engineering, Jadavpur University', email: '', committee_type: 'technical', display_order: 99, is_active: true, image_url: null },
  { id: 't100', name: 'Prof. (Dr.) Ankush Bag', designation: 'TPC Member', affiliation: 'Assistant Professor, Department of Electronics and Electrical Engineering, Indian Institute of Technology Guwahati', email: '', committee_type: 'technical', display_order: 100, is_active: true, image_url: null },
  { id: 't101', name: 'Prof. (Dr.) Pritam Kumar Das', designation: 'TPC Member', affiliation: 'Associate Professor, Department of Mechanical Engineering, Aditya University', email: '', committee_type: 'technical', display_order: 101, is_active: true, image_url: null },
  { id: 't102', name: 'Prof. (Dr.) Mithun Das', designation: 'TPC Member', affiliation: 'Assistant Professor, School of Nuclear Studies, Jadavpur University', email: '', committee_type: 'technical', display_order: 102, is_active: true, image_url: null },
  { id: 't103', name: 'Prof. (Dr.) Arindam K. Sil', designation: 'TPC Member', affiliation: 'Associate Professor, Department of Electrical Engineering, Jadavpur University', email: '', committee_type: 'technical', display_order: 103, is_active: true, image_url: null },
  { id: 't104', name: 'Prof. (Dr.) Sajjan Kumar', designation: 'TPC Member', affiliation: 'Assistant Professor, Department of Electrical and Electronics Engineering, SSN College of Engineering, Chennai', email: '', committee_type: 'technical', display_order: 104, is_active: true, image_url: null },
  { id: 't105', name: 'Prof. (Dr.) Suman Chakraborty', designation: 'TPC Member', affiliation: 'Professor, Department of Mechanical Engineering & Sir J. C. Bose National Fellow, IIT Kharagpur', email: '', committee_type: 'technical', display_order: 105, is_active: true, image_url: null },
  { id: 't106', name: 'Prof. (Dr.) Ranjan Gangulyy', designation: 'TPC Member', affiliation: 'Professor, Department of Power Engineering, Jadavpur University', email: '', committee_type: 'technical', display_order: 106, is_active: true, image_url: null },
  { id: 't107', name: 'Prof. (Dr.) Amitava Datta', designation: 'TPC Member', affiliation: 'Pro Vice-Chancellor, Jadavpur University', email: '', committee_type: 'technical', display_order: 107, is_active: true, image_url: null },
  { id: 't108', name: 'Prof. (Dr.) Niladri Chakraborty', designation: 'TPC Member', affiliation: 'Professor, Department of Power Engineering, Jadavpur University', email: '', committee_type: 'technical', display_order: 108, is_active: true, image_url: null },
  { id: 't109', name: 'Prof. (Dr.) Kaustuv Kanti Ganguli', designation: 'TPC Member', affiliation: 'Associate Professor, College of Interdisciplinary Studies in Zayed University', email: '', committee_type: 'technical', display_order: 109, is_active: true, image_url: null },
  { id: 't110', name: 'Prof. (Dr.) Joydeep Munshi', designation: 'TPC Member', affiliation: 'Lead Scientist at GE Aerospace Research, AI/ML and Computer Vision group, Pennsylvania, United States', email: '', committee_type: 'technical', display_order: 110, is_active: true, image_url: null },
  { id: 't111', name: 'Prof. (Dr.) Amit Kumar Singh', designation: 'TPC Member', affiliation: 'Assistant Professor, RAJKIYA ENGINEERING COLLEGE, AMBEDKAR NAGAR', email: '', committee_type: 'technical', display_order: 111, is_active: true, image_url: null },
  { id: 't112', name: 'Prof. (Dr.) Kedar Nath Das', designation: 'TPC Member', affiliation: 'Associate Professor, NIT Silchar', email: '', committee_type: 'technical', display_order: 112, is_active: true, image_url: null },
  { id: 't113', name: 'Prof. (Dr.) Anjan Bandyopadhyay', designation: 'TPC Member', affiliation: 'Assistant Professor, KIIT University', email: '', committee_type: 'technical', display_order: 113, is_active: true, image_url: null },
  { id: 't114', name: 'Prof. (Dr.) Prantosh K. Paul', designation: 'TPC Member', affiliation: 'Assistant Professor CIS, Raiganj University', email: '', committee_type: 'technical', display_order: 114, is_active: true, image_url: null },
  { id: 't115', name: 'Prof. (Dr.) Souvik Pal', designation: 'TPC Member', affiliation: 'Associate Professor, Sister Nivedita University', email: '', committee_type: 'technical', display_order: 115, is_active: true, image_url: null },
  { id: 't116', name: 'Prof. (Dr.) Sudip Sinha', designation: 'TPC Member', affiliation: 'Technical Manager, The Linde Group', email: '', committee_type: 'technical', display_order: 116, is_active: true, image_url: null },
  { id: 't117', name: 'Prof. (Dr.) Rahul Kumar Ghosh', designation: 'TPC Member', affiliation: 'Associate Professor, Brainware University', email: '', committee_type: 'technical', display_order: 117, is_active: true, image_url: null },
  { id: 't118', name: 'Prof. (Dr.) Avijit Kumar Chaudhuri', designation: 'TPC Member', affiliation: 'Associate Professor, Brainware University', email: '', committee_type: 'technical', display_order: 118, is_active: true, image_url: null },
  { id: 't119', name: 'Prof. (Dr.) Bikramjit Sarkar', designation: 'TPC Member', affiliation: 'HOD CSE, JIS College of Engineering', email: '', committee_type: 'technical', display_order: 119, is_active: true, image_url: null },
  { id: 't120', name: 'Prof. (Dr.) Chirasree Roy Chowdhury', designation: 'TPC Member', affiliation: 'Associate Professor, Electronics and Telecommunication Engineering', email: '', committee_type: 'technical', display_order: 120, is_active: true, image_url: null },
  { id: 't121', name: 'Prof. (Dr.) Ankita Pramanik', designation: 'TPC Member', affiliation: 'Associate Professor, Electronics and Telecommunication Engineering', email: '', committee_type: 'technical', display_order: 121, is_active: true, image_url: null },
  { id: 't122', name: 'Prof. (Dr.) Prasun Chakrabarti', designation: 'TPC Member', affiliation: 'Dean - Engineering and Professor CSE', email: '', committee_type: 'technical', display_order: 122, is_active: true, image_url: null },
  { id: 't123', name: 'Prof. Padampat Singhania', designation: 'TPC Member', affiliation: 'University, Udaipur', email: '', committee_type: 'technical', display_order: 123, is_active: true, image_url: null },
  { id: 't124', name: 'Prof. (Dr.) Dilip K. Banerjee', designation: 'TPC Member', affiliation: 'Former Pro VC, Central University of Jharkhand, Ranchi', email: '', committee_type: 'technical', display_order: 124, is_active: true, image_url: null },
  { id: 't125', name: 'Prof. (Dr.) Goutam Panigrahi', designation: 'TPC Member', affiliation: 'Assistant Professor, NIT Durgapur', email: '', committee_type: 'technical', display_order: 125, is_active: true, image_url: null },
  { id: 't126', name: 'Prof. (Dr.) Biswapati Jana', designation: 'TPC Member', affiliation: 'HOD Computer Science, Vidyasagar University', email: '', committee_type: 'technical', display_order: 126, is_active: true, image_url: null },
  { id: 't127', name: 'Prof. (Dr.) Samarjit Kar', designation: 'TPC Member', affiliation: 'Professor, NIT Durgapur', email: '', committee_type: 'technical', display_order: 127, is_active: true, image_url: null },
  { id: 't128', name: 'Prof. (Dr.) Amar Kishore', designation: 'TPC Member', affiliation: 'Assistant Professor, Magadh University', email: '', committee_type: 'technical', display_order: 128, is_active: true, image_url: null },
  { id: 't129', name: 'Prof. (Dr.) Jagdish Chand Bansal', designation: 'TPC Member', affiliation: 'Associate Professor, South Asian University, New Delhi', email: '', committee_type: 'technical', display_order: 129, is_active: true, image_url: null },
  { id: 't130', name: 'Prof. (Dr.) Rajneesh Talwar', designation: 'TPC Member', affiliation: 'Dean, Chitkara University', email: '', committee_type: 'technical', display_order: 130, is_active: true, image_url: null },
  { id: 't131', name: 'Prof. (Dr.) Pawanesh Abrol', designation: 'TPC Member', affiliation: 'Professor and Head, Computer Science and IT, University of Jammu', email: '', committee_type: 'technical', display_order: 131, is_active: true, image_url: null },
  { id: 't132', name: 'Prof. (Dr.) A. Lenin Fred', designation: 'TPC Member', affiliation: 'Principal at Mar Ephraem College of Engineering & Technology, Kanyakumari', email: '', committee_type: 'technical', display_order: 132, is_active: true, image_url: null },
  { id: 't133', name: 'Prof. (Dr.) Narendra Gupta', designation: 'TPC Member', affiliation: 'Director Education, SKN Agriculture University, Rajasthan', email: '', committee_type: 'technical', display_order: 133, is_active: true, image_url: null },
  { id: 't134', name: 'Prof. (Dr.) G.L. Sharma', designation: 'TPC Member', affiliation: 'Director, Sikkim Manipal Institute of Technology, Sikkim', email: '', committee_type: 'technical', display_order: 134, is_active: true, image_url: null },
  { id: 't135', name: 'Prof. Anjan Saha', designation: 'TPC Member', affiliation: 'Scientist, DRDO', email: '', committee_type: 'technical', display_order: 135, is_active: true, image_url: null },
  { id: 't136', name: 'Prof. (Dr.) Abhishek Das', designation: 'TPC Member', affiliation: 'Associate Professor, CSE, Aliah University, New Town, Kolkata, West Bengal', email: '', committee_type: 'technical', display_order: 136, is_active: true, image_url: null },
  { id: 't137', name: 'Prof. (Dr.) Anirban Chakraborty', designation: 'TPC Member', affiliation: 'DRDO, Bangalore, Scientist C', email: '', committee_type: 'technical', display_order: 137, is_active: true, image_url: null }
]

// Hardcoded Advisory Committee
const advisoryCommitteeData: CommitteeMemberData[] = [
  {
    id: 'a1',
    name: 'Prof. John Williams',
    designation: 'Chief Patron',
    affiliation: 'Cambridge University, UK',
    email: 'j.williams@cam.ac.uk',
    committee_type: 'advisory',
    display_order: 1,
    is_active: true,
    image_url: null
  },
  {
    id: 'a2',
    name: 'Dr. Priya Verma',
    designation: 'Patron',
    affiliation: 'NIT Trichy, India',
    email: 'priya.v@nitt.edu',
    committee_type: 'advisory',
    display_order: 2,
    is_active: true,
    image_url: null
  },
  {
    id: 'a3',
    name: 'Prof. David Lee',
    designation: 'Patron',
    affiliation: 'Oxford University, UK',
    email: 'david.lee@ox.ac.uk',
    committee_type: 'advisory',
    display_order: 3,
    is_active: true,
    image_url: null
  },
  {
    id: 'a4',
    name: 'Dr. Meera Patel',
    designation: 'Advisory Chair',
    affiliation: 'BITS Pilani, India',
    email: 'meera@bits.edu',
    committee_type: 'advisory',
    display_order: 4,
    is_active: true,
    image_url: null
  },
  {
    id: 'a5',
    name: 'Prof. Robert Garcia',
    designation: 'Advisory Member',
    affiliation: 'Barcelona Tech, Spain',
    email: 'r.garcia@upc.edu',
    committee_type: 'advisory',
    display_order: 5,
    is_active: true,
    image_url: null
  }
]

async function getOrganizingCommittee() {
  const { data, error } = await supabaseAdmin
    .from('committee_members')
    .select('*')
    .eq('is_active', true)
    .eq('committee_type', 'organizing')
    .order('display_order', { ascending: true })

  if (error) {
    console.error('Error fetching organizing committee:', error)
    return []
  }

  return data as CommitteeMemberData[]
}

export default async function CommitteePage() {
  const organizingMembers = await getOrganizingCommittee()
  const technicalMembers = technicalCommitteeData
  const advisoryMembers = advisoryCommitteeData

  // Helper function to determine hierarchy level from designation
  const getHierarchyLevel = (designation: string): 'chief' | 'patron' | 'chair' | 'member' => {
    const lower = designation.toLowerCase()
    if (lower.includes('chief patron')) return 'chief'
    if (lower.includes('patron')) return 'patron'
    if (lower.includes('chair') || lower.includes('head') || lower.includes('convener')) return 'chair'
    return 'member'
  }

  // Helper function to get hierarchy order
  const getHierarchyOrder = (level: string): number => {
    const order = { chief: 0, patron: 1, chair: 2, member: 3 }
    return order[level as keyof typeof order] || 4
  }

  // Sort members by hierarchy
  const sortByHierarchy = (members: CommitteeMemberData[]) => {
    return [...members].sort((a, b) => {
      const levelA = getHierarchyLevel(a.designation)
      const levelB = getHierarchyLevel(b.designation)
      const orderA = getHierarchyOrder(levelA)
      const orderB = getHierarchyOrder(levelB)
      
      if (orderA !== orderB) return orderA - orderB
      return a.display_order - b.display_order
    })
  }

  const sortedOrganizing = sortByHierarchy(organizingMembers)
  const sortedAdvisory = sortByHierarchy(advisoryMembers)
  const sortedTechnical = sortByHierarchy(technicalMembers)
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#14213d] to-[#1a2844] text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#fca311] to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-[#fca311]/20 backdrop-blur-sm p-4 rounded-full ring-2 ring-[#fca311]/50">
              <Users className="h-12 w-12 text-[#fca311]" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4">
            Conference <span className="text-[#fca311]">Committee</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Meet the distinguished members organizing AdComSys 2026
          </p>
        </div>
      </div>

      {/* Page Content */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        

        <Tabs defaultValue="organizing" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-gradient-to-r from-[#14213d] to-[#1a2844] p-1 h-auto">
            <TabsTrigger value="organizing" className="text-base data-[state=active]:bg-[#fca311] data-[state=active]:text-white text-gray-300 py-3">
              Organizing Committee
            </TabsTrigger>
            <TabsTrigger value="technical" className="text-base data-[state=active]:bg-[#fca311] data-[state=active]:text-white text-gray-300 py-3">
              Technical Committee
            </TabsTrigger>
            <TabsTrigger value="advisory" className="text-base data-[state=active]:bg-[#fca311] data-[state=active]:text-white text-gray-300 py-3">
              Advisory Committee
            </TabsTrigger>
          </TabsList>

          {/* Organizing Committee */}
          <TabsContent value="organizing" className="mt-6">
            {sortedOrganizing.length > 0 ? (
              <div className="space-y-8">
                {/* Chief Patrons */}
                {sortedOrganizing.filter(m => getHierarchyLevel(m.designation) === 'chief').length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <Crown className="h-6 w-6 text-yellow-500" />
                      <h2 className="text-2xl font-bold text-[#14213d]">Chief Patrons</h2>
                      <div className="h-1 flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded"></div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      {sortedOrganizing
                        .filter(m => getHierarchyLevel(m.designation) === 'chief')
                        .map((member) => (
                          <CommitteeMember
                            key={member.id}
                            name={member.name}
                            designation={member.designation}
                            affiliation={member.affiliation}
                            email={member.email}
                            image_url={member.image_url}
                            level="chief"
                          />
                        ))}
                    </div>
                  </div>
                )}

                {/* Patrons */}
                {sortedOrganizing.filter(m => getHierarchyLevel(m.designation) === 'patron').length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <Award className="h-6 w-6 text-blue-600" />
                      <h2 className="text-2xl font-bold text-[#14213d]">Patrons</h2>
                      <div className="h-1 flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded"></div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      {sortedOrganizing
                        .filter(m => getHierarchyLevel(m.designation) === 'patron')
                        .map((member) => (
                          <CommitteeMember
                            key={member.id}
                            name={member.name}
                            designation={member.designation}
                            affiliation={member.affiliation}
                            email={member.email}
                            image_url={member.image_url}
                            level="patron"
                          />
                        ))}
                    </div>
                  </div>
                )}

                {/* Chairs/Conveners */}
                {sortedOrganizing.filter(m => getHierarchyLevel(m.designation) === 'chair').length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <Briefcase className="h-6 w-6 text-green-600" />
                      <h2 className="text-2xl font-bold text-[#14213d]">Chairs & Conveners</h2>
                      <div className="h-1 flex-1 bg-gradient-to-r from-green-600 to-teal-600 rounded"></div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      {sortedOrganizing
                        .filter(m => getHierarchyLevel(m.designation) === 'chair')
                        .map((member) => (
                          <CommitteeMember
                            key={member.id}
                            name={member.name}
                            designation={member.designation}
                            affiliation={member.affiliation}
                            email={member.email}
                            image_url={member.image_url}
                            level="chair"
                          />
                        ))}
                    </div>
                  </div>
                )}

                {/* Members */}
                {sortedOrganizing.filter(m => getHierarchyLevel(m.designation) === 'member').length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <Users className="h-6 w-6 text-gray-600" />
                      <h2 className="text-2xl font-bold text-[#14213d]">Committee Members</h2>
                      <div className="h-1 flex-1 bg-gradient-to-r from-gray-600 to-gray-700 rounded"></div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      {sortedOrganizing
                        .filter(m => getHierarchyLevel(m.designation) === 'member')
                        .map((member) => (
                          <CommitteeMember
                            key={member.id}
                            name={member.name}
                            designation={member.designation}
                            affiliation={member.affiliation}
                            email={member.email}
                            image_url={member.image_url}
                            level="member"
                          />
                        ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No organizing committee members found.</p>
              </div>
            )}
          </TabsContent>

          {/* Technical Committee */}
          <TabsContent value="technical" className="mt-6">
            {sortedTechnical.length > 0 ? (
              <div className="space-y-8">
                {/* Chief Technical Advisors */}
                {sortedTechnical.filter(m => getHierarchyLevel(m.designation) === 'chief').length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <Crown className="h-6 w-6 text-yellow-500" />
                      <h2 className="text-2xl font-bold text-[#14213d]">Chief Technical Advisors</h2>
                      <div className="h-1 flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded"></div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      {sortedTechnical
                        .filter(m => getHierarchyLevel(m.designation) === 'chief')
                        .map((member) => (
                          <CommitteeMember
                            key={member.id}
                            name={member.name}
                            designation={member.designation}
                            affiliation={member.affiliation}
                            email={member.email}
                            image_url={member.image_url}
                            level="chief"
                          />
                        ))}
                    </div>
                  </div>
                )}

                {/* Senior TPC Members */}
                {sortedTechnical.filter(m => getHierarchyLevel(m.designation) === 'patron').length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <Award className="h-6 w-6 text-blue-600" />
                      <h2 className="text-2xl font-bold text-[#14213d]">Senior TPC Members</h2>
                      <div className="h-1 flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded"></div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      {sortedTechnical
                        .filter(m => getHierarchyLevel(m.designation) === 'patron')
                        .map((member) => (
                          <CommitteeMember
                            key={member.id}
                            name={member.name}
                            designation={member.designation}
                            affiliation={member.affiliation}
                            email={member.email}
                            image_url={member.image_url}
                            level="patron"
                          />
                        ))}
                    </div>
                  </div>
                )}

                {/* TPC Chairs */}
                {sortedTechnical.filter(m => getHierarchyLevel(m.designation) === 'chair').length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <Briefcase className="h-6 w-6 text-green-600" />
                      <h2 className="text-2xl font-bold text-[#14213d]">TPC Chairs</h2>
                      <div className="h-1 flex-1 bg-gradient-to-r from-green-600 to-teal-600 rounded"></div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      {sortedTechnical
                        .filter(m => getHierarchyLevel(m.designation) === 'chair')
                        .map((member) => (
                          <CommitteeMember
                            key={member.id}
                            name={member.name}
                            designation={member.designation}
                            affiliation={member.affiliation}
                            email={member.email}
                            image_url={member.image_url}
                            level="chair"
                          />
                        ))}
                    </div>
                  </div>
                )}

                {/* TPC Members */}
                {sortedTechnical.filter(m => getHierarchyLevel(m.designation) === 'member').length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <Users className="h-6 w-6 text-gray-600" />
                      <h2 className="text-2xl font-bold text-[#14213d]">TPC Members</h2>
                      <div className="h-1 flex-1 bg-gradient-to-r from-gray-600 to-gray-700 rounded"></div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      {sortedTechnical
                        .filter(m => getHierarchyLevel(m.designation) === 'member')
                        .map((member) => (
                          <CommitteeMember
                            key={member.id}
                            name={member.name}
                            designation={member.designation}
                            affiliation={member.affiliation}
                            email={member.email}
                            image_url={member.image_url}
                            level="member"
                          />
                        ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No technical committee members found.</p>
              </div>
            )}
          </TabsContent>

          {/* Advisory Committee */}
          <TabsContent value="advisory" className="mt-6">
            {sortedAdvisory.length > 0 ? (
              <div className="space-y-8">
                {/* Chief Advisors */}
                {sortedAdvisory.filter(m => getHierarchyLevel(m.designation) === 'chief').length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <Crown className="h-6 w-6 text-yellow-500" />
                      <h2 className="text-2xl font-bold text-[#14213d]">Chief Advisors</h2>
                      <div className="h-1 flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded"></div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      {sortedAdvisory
                        .filter(m => getHierarchyLevel(m.designation) === 'chief')
                        .map((member) => (
                          <CommitteeMember
                            key={member.id}
                            name={member.name}
                            designation={member.designation}
                            affiliation={member.affiliation}
                            email={member.email}
                            image_url={member.image_url}
                            level="chief"
                          />
                        ))}
                    </div>
                  </div>
                )}

                {/* Senior Advisors/Patrons */}
                {sortedAdvisory.filter(m => getHierarchyLevel(m.designation) === 'patron').length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <Award className="h-6 w-6 text-blue-600" />
                      <h2 className="text-2xl font-bold text-[#14213d]">Senior Advisors</h2>
                      <div className="h-1 flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded"></div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      {sortedAdvisory
                        .filter(m => getHierarchyLevel(m.designation) === 'patron')
                        .map((member) => (
                          <CommitteeMember
                            key={member.id}
                            name={member.name}
                            designation={member.designation}
                            affiliation={member.affiliation}
                            email={member.email}
                            image_url={member.image_url}
                            level="patron"
                          />
                        ))}
                    </div>
                  </div>
                )}

                {/* Advisory Board Chairs */}
                {sortedAdvisory.filter(m => getHierarchyLevel(m.designation) === 'chair').length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <Briefcase className="h-6 w-6 text-green-600" />
                      <h2 className="text-2xl font-bold text-[#14213d]">Advisory Board Chairs</h2>
                      <div className="h-1 flex-1 bg-gradient-to-r from-green-600 to-teal-600 rounded"></div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      {sortedAdvisory
                        .filter(m => getHierarchyLevel(m.designation) === 'chair')
                        .map((member) => (
                          <CommitteeMember
                            key={member.id}
                            name={member.name}
                            designation={member.designation}
                            affiliation={member.affiliation}
                            email={member.email}
                            image_url={member.image_url}
                            level="chair"
                          />
                        ))}
                    </div>
                  </div>
                )}

                {/* Advisory Members */}
                {sortedAdvisory.filter(m => getHierarchyLevel(m.designation) === 'member').length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <Users className="h-6 w-6 text-gray-600" />
                      <h2 className="text-2xl font-bold text-[#14213d]">Advisory Board Members</h2>
                      <div className="h-1 flex-1 bg-gradient-to-r from-gray-600 to-gray-700 rounded"></div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      {sortedAdvisory
                        .filter(m => getHierarchyLevel(m.designation) === 'member')
                        .map((member) => (
                          <CommitteeMember
                            key={member.id}
                            name={member.name}
                            designation={member.designation}
                            affiliation={member.affiliation}
                            email={member.email}
                            image_url={member.image_url}
                            level="member"
                          />
                        ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No advisory committee members found.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-[#14213d] to-[#1a2844] text-white border-0 shadow-2xl">
            <CardContent className="p-12 text-center">
              <Award className="h-16 w-16 mx-auto mb-6 text-[#fca311]" />
              <h3 className="text-3xl font-bold mb-4">
                Join Our Distinguished Conference
              </h3>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Be part of AdComSys 2026 and contribute to the advancement of communication systems
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/signup">
                  <Button size="lg" className="w-full sm:w-auto bg-[#fca311] hover:bg-[#ff9800] text-white border-0 shadow-lg hover:shadow-xl transition-all">
                    Register Now
                  </Button>
                </Link>
                <Link href="https://cmt3.research.microsoft.com/AdComSys2025" target="_blank">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent text-white border-2 border-white hover:bg-white/10">
                    Submit Your Paper
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
