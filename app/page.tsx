import Link from 'next/link';
import CardSwap ,{Card} from '@/components/CardSwap';
import UploadPage from './upload/page';
import { FileCheck, Users, MessageSquare, CheckCircle, ArrowRight, Upload, Eye, Send } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileCheck className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-800">EvaluateHub</span>
          </div>
          <div className="flex space-x-4">
            <Link href="/login">
            <button className="px-4 py-2 text-gray-600 hover:text-blue-600 transition">Login</button>
            </Link>
            <Link href="/signup">
            <button className="px-4 py-2 text-gray-600 hover:text-blue-600 transition">SignUp</button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-24">
        <div className="text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
            Streamline Answer Sheet
            <span className="block text-blue-600">Review & Feedback</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A collaborative platform connecting examiners and faculty for efficient answer sheet evaluation and feedback management
          </p>
          <div className="flex justify-center space-x-4 pt-4">
            <Link href="/login">
            <button className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold flex items-center">
              Start Review Process <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
<section className="w-full px-4 sm:px-6 lg:px-12 py-12 bg-gray-50 overflow-hidden">
  <div
    className="relative mx-auto flex flex-row items-center justify-between flex-wrap lg:flex-nowrap gap-6 sm:gap-10"
    style={{ minHeight: "500px" }}
  >
    {/* LEFT SIDE - Heading */}
    <div className="flex-1 min-w-[280px] text-left">
      <h1 className="font-extrabold text-gray-900 text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-tight tracking-tight">
        HOW <br /> IT <br /> WORKS
      </h1>
    </div>

    {/* RIGHT SIDE - CardSwap */}
    <div style={{ height: '250px', position: 'relative' ,margin:"10px" }}>
      <CardSwap
        cardDistance={60}
        verticalDistance={70}
        delay={5000}
        pauseOnHover={false}
      >
        {/* CARD 1 */}
        <Card className="bg-white shadow-md rounded-xl">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 sm:p-8 text-white space-y-4 h-full flex flex-col justify-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center mx-auto lg:mx-0">
              <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-left lg:text-left">
              1. Examiner Uploads
            </h3>
            <p className="text-blue-50 text-sm sm:text-base text-left lg:text-left">
              Examiners upload answer sheets to the system with course and student details.
            </p>
          </div>
        </Card>

        {/* CARD 2 */}
        <Card className="bg-white shadow-md rounded-xl">
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 sm:p-8 text-white space-y-4 h-full flex flex-col justify-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center mx-auto lg:mx-0">
              <Eye className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-left lg:text-left">
              2. Faculty Reviews
            </h3>
            <p className="text-purple-50 text-sm sm:text-base text-left lg:text-left">
              Related faculty members receive and review the answer sheets, providing detailed feedback.
            </p>
          </div>
        </Card>

        {/* CARD 3 */}
        <Card className="bg-white shadow-md rounded-xl">
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 sm:p-8 text-white space-y-4 h-full flex flex-col justify-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center mx-auto lg:mx-0">
              <Send className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-left lg:text-left">
              3. Feedback Delivered
            </h3>
            <p className="text-green-50 text-sm sm:text-base text-left lg:text-left">
              Feedback is automatically sent back to the examiner for final review and action.
            </p>
          </div>
        </Card>
      </CardSwap>
    </div>
  </div>
</section>



      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-16 mt-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-2">Key Features</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Upload className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Easy Upload</h3>
            <p className="text-gray-600">Simple drag-and-drop interface for answer sheet submission</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Smart Routing</h3>
            <p className="text-gray-600">Automatic assignment to relevant faculty members</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Rich Feedback</h3>
            <p className="text-gray-600">Comprehensive feedback tools with comments and annotations</p>
          </div>

         
        </div>
      </section>

    



      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Simplify Your Review Process?</h2>
          <p className="text-xl text-blue-100 mb-8">Join hundreds of institutions already using EvaluateHub</p>
          <Link href="/login">
          <button className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition font-semibold text-lg">
            Get Started Free
          </button>
          </Link>
        </div>
      </section>


      {/* Footer */}
    </div>
    
  );
}