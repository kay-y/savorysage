import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, MapPin, Clock, ChevronDown, Upload, Check, Users, ChefHat } from 'lucide-react';
import { jobListings } from '@/data/menu';
import type { JobListing, ApplicationFormData } from '@/types';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

export function CareersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<ApplicationFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    message: '',
  });

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    gsap.fromTo(
      content.children,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  const handleApply = (job: JobListing) => {
    setSelectedJob(job);
    setFormData(prev => ({ ...prev, position: job.title }));
    setIsApplyOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSuccess(true);
    toast.success('Application submitted successfully!');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const fohJobs = jobListings.filter(job => job.department === 'FOH');
  const bohJobs = jobListings.filter(job => job.department === 'BOH');

  const renderJobCard = (job: JobListing) => (
    <div
      key={job.id}
      className="bg-white border border-charcoal/10 hover:border-gold/30 transition-all duration-300"
    >
      <button
        onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
        className="w-full p-4 lg:p-5 flex items-center justify-between text-left"
      >
        <div className="pr-4">
          <h4 className="font-display text-base lg:text-lg text-charcoal mb-1">{job.title}</h4>
          <div className="flex flex-wrap items-center gap-2 lg:gap-4 text-xs lg:text-sm text-charcoal/60">
            <span className="flex items-center gap-1">
              <Clock className="w-3 lg:w-3.5 h-3 lg:h-3.5" />
              {job.type}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 lg:w-3.5 h-3 lg:h-3.5" />
              {job.location}
            </span>
          </div>
        </div>
        <ChevronDown 
          className={`w-5 h-5 text-charcoal/40 flex-shrink-0 transition-transform ${
            expandedJob === job.id ? 'rotate-180' : ''
          }`} 
        />
      </button>
      
      {expandedJob === job.id && (
        <div className="px-4 lg:px-5 pb-4 lg:pb-5 border-t border-charcoal/10 pt-4">
          <p className="text-charcoal/70 mb-4 text-sm">{job.description}</p>
          
          <div className="mb-4">
            <span className="micro-label text-charcoal/50 mb-2 block text-xs">REQUIREMENTS</span>
            <ul className="space-y-1">
              {job.requirements.map((req, idx) => (
                <li key={idx} className="text-xs lg:text-sm text-charcoal/70 flex items-start gap-2">
                  <span className="w-1 h-1 bg-gold rounded-full mt-1.5 flex-shrink-0"></span>
                  {req}
                </li>
              ))}
            </ul>
          </div>
          
          <button
            onClick={() => handleApply(job)}
            className="btn-primary text-sm"
          >
            Apply Now
          </button>
        </div>
      )}
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="careers"
      className="relative bg-offwhite py-20 lg:py-28"
    >
      <div className="w-full px-6 lg:px-12" ref={contentRef}>
        {/* Header */}
        <div className="mb-12">
          <span className="micro-label text-gold mb-4 block">JOIN OUR TEAM</span>
          <h2 className="heading-display text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-4">
            CAREERS AT SAVOR & SAGE
          </h2>
          <p className="body-text text-charcoal/70 max-w-xl">
            We&apos;re always looking for passionate people who love food and hospitality. 
            Join a team that values craft, creativity, and genuine care.
          </p>
        </div>

        {/* Culture Section */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-12">
          <div className="relative overflow-hidden">
            <img
              src="/images/kitchen_team.jpg"
              alt="Our kitchen team at work"
              className="w-full h-full object-cover min-h-[250px] lg:min-h-[300px]"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="font-display text-xl lg:text-2xl text-charcoal mb-4">
              Life at Savor & Sage
            </h3>
            <p className="body-text text-charcoal/70 mb-6 text-sm lg:text-base">
              Our kitchen is a place where creativity meets discipline. We believe in 
              investing in our team—offering competitive pay, flexible scheduling, and 
              real opportunities for growth.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 lg:w-10 h-8 lg:h-10 bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 lg:w-5 h-4 lg:h-5 text-gold" />
                </div>
                <div>
                  <span className="font-medium text-charcoal block text-sm lg:text-base">Team First</span>
                  <span className="text-xs lg:text-sm text-charcoal/60">Collaborative culture</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 lg:w-10 h-8 lg:h-10 bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <ChefHat className="w-4 lg:w-5 h-4 lg:h-5 text-gold" />
                </div>
                <div>
                  <span className="font-medium text-charcoal block text-sm lg:text-base">Learn & Grow</span>
                  <span className="text-xs lg:text-sm text-charcoal/60">Training provided</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Front of House */}
          <div>
            <h3 className="font-display text-lg text-charcoal mb-4 flex items-center gap-2">
              <span className="w-6 lg:w-8 h-px bg-gold"></span>
              Front of House
            </h3>
            <div className="space-y-3 lg:space-y-4">
              {fohJobs.map(renderJobCard)}
            </div>
          </div>

          {/* Back of House */}
          <div>
            <h3 className="font-display text-lg text-charcoal mb-4 flex items-center gap-2">
              <span className="w-6 lg:w-8 h-px bg-gold"></span>
              Back of House
            </h3>
            <div className="space-y-3 lg:space-y-4">
              {bohJobs.map(renderJobCard)}
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      <Dialog open={isApplyOpen} onOpenChange={setIsApplyOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto bg-white p-5 lg:p-6">
          {isSuccess ? (
            <div className="py-6 lg:py-8 text-center">
              <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-6 h-6 lg:w-8 lg:h-8 text-gold" />
              </div>
              <h3 className="font-display text-xl lg:text-2xl text-charcoal mb-2">
                Application Submitted
              </h3>
              <p className="text-charcoal/70 mb-6 text-sm lg:text-base">
                Thank you for your interest! We&apos;ve received your application for{' '}
                <span className="font-medium">{selectedJob?.title}</span>. 
                Our hiring manager will review and contact you within 3-5 business days.
              </p>
              <button
                onClick={() => {
                  setIsApplyOpen(false);
                  setIsSuccess(false);
                  setResumeFile(null);
                  setFormData({
                    firstName: '', lastName: '', email: '', phone: '', position: '', message: ''
                  });
                }}
                className="btn-secondary"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-lg lg:text-xl text-charcoal">
                  Apply for {selectedJob?.title}
                </DialogTitle>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-3 lg:space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-3 lg:gap-4">
                  <div>
                    <label htmlFor="firstName" className="micro-label text-charcoal/50 mb-1 block text-xs">FIRST NAME</label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                      className="w-full px-2.5 lg:px-3 py-2 border border-charcoal/20 text-charcoal text-sm focus:border-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="micro-label text-charcoal/50 mb-1 block text-xs">LAST NAME</label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                      className="w-full px-2.5 lg:px-3 py-2 border border-charcoal/20 text-charcoal text-sm focus:border-gold focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="micro-label text-charcoal/50 mb-1 block text-xs">EMAIL</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-2.5 lg:px-3 py-2 border border-charcoal/20 text-charcoal text-sm focus:border-gold focus:outline-none"
                    title="Enter your email address"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="micro-label text-charcoal/50 mb-1 block text-xs">PHONE</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-2.5 lg:px-3 py-2 border border-charcoal/20 text-charcoal text-sm focus:border-gold focus:outline-none"
                    title="Enter your phone number"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <label className="micro-label text-charcoal/50 mb-1 block text-xs">RESUME (PDF OR DOC)</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                      id="resume-upload"
                      name="resume"
                      title="Upload your resume in PDF or DOC format"
                      aria-label="Upload resume file"
                      aria-describedby="resume-label"
                      required
                    />
                    <label
                      htmlFor="resume-upload"
                      className="flex items-center gap-2 px-2.5 lg:px-3 py-2 border border-charcoal/20 text-charcoal text-sm cursor-pointer hover:border-gold transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      <span className="truncate">{resumeFile ? resumeFile.name : 'Choose file'}</span>
                    </label>
                    <span id="resume-label" className="sr-only">Resume upload (required)</span>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="micro-label text-charcoal/50 mb-1 block text-xs">WHY SAVOR & SAGE?</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    required
                    placeholder="Tell us why you'd be a great fit..."
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-2.5 lg:px-3 py-2 border border-charcoal/20 text-charcoal text-sm focus:border-gold focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  <Briefcase className="w-4 h-4" />
                  Submit Application
                </button>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
