import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { generateMetadata as createMetadata } from '@/lib/metadata'
import { Metadata } from 'next'

export const metadata: Metadata = createMetadata({
  title: 'Chief Guest & Keynote Speakers',
  description: 'Meet the distinguished Chief Guest and Keynote Speakers at AdComSys 2026. Renowned experts sharing insights on advanced computing and systems.',
  path: '/speakers',
  keywords: ['chief guest', 'keynote speakers', 'invited speakers', 'AdComSys 2026', 'conference speakers', 'computing experts']
})

export default function SpeakersPage() {
  const speakers = [
    {
      id: 'chief-guest',
      title: 'Chief Guest',
      name: 'Prof. Tanusri Saha-Dasgupta',
      designation: 'APS fellow, FTWAS, FNA, FASc, FNASc, J.C. Bose National Fellow, Director',
      affiliation: 'S. N. Bose National Centre for Basic Sciences, Under Department of Science and Technology, Govt. of India, Kolkata',
      image: '/assets/images/chief guest.jpeg',
      bio: 'Dr. Tanusri Saha Dasgupta is the Director and Senior Professor at S. N. Bose National Centre for Basic Sciences, Kolkata. She completed her M.Sc. in Physics from the University of Calcutta in 1990, securing first rank, and obtained her Ph.D. in Condensed Matter Physics from the same university in 1995. Her main research areas include computational materials physics, quantum materials, machine learning for materials informatics, and mineral physics. She has held several academic and research positions in India and abroad, including at ONERA Paris, the Max Planck Institute, IISc Bangalore, and S. N. Bose National Centre. She has received several prestigious honours, including the Swarnajayanti Fellowship, DAE Raja Ramanna Prize Lecture Award, J. C. Bose Fellowship, and fellowships of major scientific academies such as IASc, NASI, APS, TWAS, and INSA. Her research output includes more than 300 publications, with a substantial number in Physical Review journals.'
    },
    {
      id: 'keynote-1',
      title: 'Keynote Speaker 1',
      name: 'Dr. Saikat Chakrabarti',
      designation: 'Senior Principal Scientist & Deputy Head',
      affiliation: 'Structural Biology & Bioinformatics, Council of Scientific & Industrial Research-Indian Institute of Chemical Biology (CSIR-IICB), Kolkata',
      image: '/assets/images/keynote speaker 1.jpeg',
      bio: 'Dr. Saikat Chakrabarti, Ph.D., is a Senior Principal Scientist at CSIR-IICB, Kolkata, and Deputy Head of the Structural Biology and Bioinformatics Division. He is also a Professor at the Academy of Scientific and Innovative Research (AcSIR) and has previously worked as a Staff Scientist and Postdoctoral Fellow at NCBI/NLM/NIH, USA. His research focuses on protein–protein interactions, systems biology, multi-omics data integration, molecular modelling, docking, dynamics, and machine-learning-based analysis of diseases such as cancer, malaria, leishmaniasis, Alzheimer’s disease, and stroke. He has contributed extensively to computational biology through bio-molecular network analysis, disease-specific interaction studies, biomarker/therapeutic-target identification, and the development of freely available computational tools and web servers. His publication record reflects broad interdisciplinary expertise across structural biology, bioinformatics, infectious diseases, cancer biology, neurodegenerative disease analysis, and AI-assisted biomedical research.'
    },
    {
      id: 'keynote-2',
      title: 'Keynote Speaker 2',
      name: 'Prof. Koel Das',
      designation: 'Professor',
      affiliation: 'Department of Mathematics and Statistics, Adjunct Faculty, Department of Biological Sciences, INDIAN INSTITUTE OF SCIENCE EDUCATION AND RESEARCH (IISER), KOLKATA',
      image: '/assets/images/keynote speaker 2.jpeg',
      bio: 'Prof. Koel Das is a Professor at IISER Kolkata, associated with the Department of Mathematics and Statistics and the Department of Biological Sciences. She holds a Ph.D. in Electrical and Computer Engineering from the University of California, Irvine, completed in 2007. Her research interests include biological and machine learning, computational neuroscience, visual perception, feature extraction, pattern classification, and brain–computer interfaces. Before joining IISER Kolkata, she served as a Postdoctoral Scholar at the University of California, Santa Barbara, and as an Assistant Professor at South Asian University. Her academic achievements include the Ramalingaswami Fellowship from DBT, India, along with other international and national scholarships and fellowships.'
    },
    {
      id: 'keynote-3',
      title: 'Keynote Speaker 3',
      name: 'Dr. Parag Kumar Guhathakurta',
      designation: 'Assistant Professor',
      affiliation: 'National Institute of Technology, Durgapur, India',
      image: '/assets/images/keynote speaker 3.jpeg',
      bio: 'Dr. Parag Kumar Guha Thakurta is an Assistant Professor in the Department of Computer Science and Engineering at the National Institute of Technology Durgapur, India, where he has been serving since 2007. Earlier, he worked as a Lecturer at Netaji Subhash Engineering College, Kolkata, from 2004 to 2007. He completed his B.Tech in Computer Science and Technology from the University of Kalyani in 2002 and his M.Tech in Computer Science and Engineering from the University of Calcutta. His research interests include networking, Internet of Things, data analytics, and AI/ML-based applications. He has authored more than fifty international journal and conference papers, supervised Ph.D., M.Tech, and B.Tech research projects, and contributed to government-funded projects as PI/Co-PI. He has also served as a reviewer and program committee member for several national and international journals and conferences.'
    }
  ]

  return (
    <div className="min-h-screen relative z-10">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-linear-to-r from-[#14213d] to-[#1a2844] text-white py-12 sm:py-16 lg:py-20 relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-linear-to-br from-[#FFCC5C] to-transparent"></div>
        </div>
        <div className="container mx-auto px-3 sm:px-4 text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-2">
            Chief Guest &amp; <span className="text-[#FFCC5C]">Keynote Speakers</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-3xl mx-auto font-medium px-2">
            Learn from world-renowned experts and thought leaders
          </p>
        </div>
      </div>

      {/* Speakers Content */}
      <div className="container mx-auto px-3 sm:px-4 py-10 sm:py-16 max-w-6xl">
        <div className="space-y-8 sm:space-y-12">
          {speakers.map((speaker, index) => (
            <Card key={speaker.id} className="shadow-2xl border-l-4 border-[#FFCC5C] bg-white relative z-10 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#14213d] to-[#FFCC5C]"></div>
              <CardContent className="p-6 sm:p-8 lg:p-10">
                <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
                  {/* Speaker Image */}
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mx-auto lg:mx-0 rounded-full overflow-hidden border-4 border-[#FFCC5C] shadow-xl">
                      <Image
                        src={speaker.image}
                        alt={speaker.name}
                        width={192}
                        height={192}
                        className="w-full h-full object-cover"
                        priority={index === 0}
                      />
                    </div>
                  </div>

                  {/* Speaker Details */}
                  <div className="flex-1 text-center lg:text-left">
                    <div className="mb-4">
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#FFCC5C] mb-2">
                        {speaker.title}
                      </h3>
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#14213d] mb-2">
                        {speaker.name}
                      </h2>
                      <p className="text-sm sm:text-base lg:text-lg font-semibold text-gray-700 mb-1">
                        {speaker.designation}
                      </p>
                      <p className="text-sm sm:text-base text-gray-600">
                        {speaker.affiliation}
                      </p>
                    </div>

                    <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
                      <p className="text-gray-700 leading-relaxed text-justify">
                        {speaker.bio}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}


