import { useState, useEffect, useRef } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle,
  User,
  MessageSquare,
} from "lucide-react";
import { useContactStore } from "../store/contact.store";

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const sendContactForm = useContactStore((state) => state.sendContactForm);
  const loading = useContactStore((state) => state.loading);
  const error = useContactStore((state) => state.error);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await sendContactForm(formData);

      if (result.success) {
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });

        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      }
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "talk2muhammedawwal@gmail.com",
      href: "mailto:talk2muhammedawwal@gmail.com",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Location",
      value: "Kano, Nigeria",
      href: "#",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Phone",
      value: "+234 903 614 4610",
      href: "tel:+2349036144610",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative flex flex-col items-center pt-20 pb-20 overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "8s" }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-tertiary/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "10s", animationDelay: "2s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div
        className="w-full px-margin-mobile mt-10 md:px-margin-laptop lg:px-margin-desktop"
        style={{ maxWidth: "1280px" }}
      >
        {/* Header */}
        <div className="relative z-10 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-gutter items-start">
            <div className="lg:col-span-5 xl:col-span-4">
              <div
                className={`flex items-center gap-3 mb-4 lg:mb-0 transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10"
                }`}
              >
                <span className="w-8 h-[2px] bg-primary hidden lg:block" />
                <p className="font-mono text-label uppercase tracking-widest text-primary">
                  Contact
                </p>
              </div>
              <h2
                className={`font-heading text-headline-xl-mobile lg:text-headline-xl font-bold leading-none text-on-surface transition-all duration-700 delay-100 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10"
                }`}
              >
                Let's Connect
              </h2>
              <p
                className={`mt-4 font-body text-body-md text-on-surface-variant transition-all duration-700 delay-200 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                Have a project in mind or want to collaborate? I'd love to hear
                from you.
              </p>
            </div>

            <div className="lg:col-span-7 xl:col-span-8">
              <p
                className={`font-body text-body-lg leading-relaxed text-on-surface-variant transition-all duration-700 delay-300 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your vision.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Content */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div
            className={`lg:col-span-2 space-y-6 transition-all duration-700 delay-400 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="bg-surface-container/40 backdrop-blur-sm rounded-2xl p-6 border border-outline-variant/10">
              <h3 className="font-heading text-headline-md font-semibold text-on-surface mb-6">
                Contact Information
              </h3>

              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.href}
                    className="flex items-start gap-4 p-3 rounded-xl transition-all duration-300 hover:bg-surface-variant/30 group"
                  >
                    <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-on-primary">
                      {info.icon}
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant/50">
                        {info.label}
                      </p>
                      <p className="font-body text-body-sm text-on-surface group-hover:text-primary transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="bg-surface-container/40 backdrop-blur-sm rounded-2xl p-6 border border-outline-variant/10">
              <div className="flex items-center gap-3">
                <div className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-primary" />
                </div>
                <span className="font-mono text-xs uppercase tracking-widest text-primary">
                  Available for work
                </span>
              </div>
              <p className="mt-3 font-body text-body-sm text-on-surface-variant">
                Currently open to new opportunities and collaborations.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`lg:col-span-3 transition-all duration-700 delay-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="bg-surface-container/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-outline-variant/10">
              <h3 className="font-heading text-headline-md font-semibold text-on-surface mb-6">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block font-mono text-[10px] uppercase tracking-widest text-on-surface-variant/60 mb-2"
                    >
                      Your Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/40" />
                      <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        className="w-full bg-surface-container-high/50 border border-outline-variant/20 rounded-lg py-2.5 pl-10 pr-4 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-50"
                        placeholder="Wazobia"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block font-mono text-[10px] uppercase tracking-widest text-on-surface-variant/60 mb-2"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/40" />
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        className="w-full bg-surface-container-high/50 border border-outline-variant/20 rounded-lg py-2.5 pl-10 pr-4 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-50"
                        placeholder="wazobia@example.com"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block font-mono text-[10px] uppercase tracking-widest text-on-surface-variant/60 mb-2"
                  >
                    Subject
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/40" />
                    <input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      className="w-full bg-surface-container-high/50 border border-outline-variant/20 rounded-lg py-2.5 pl-10 pr-4 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-50"
                      placeholder="Project Discussion"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block font-mono text-[10px] uppercase tracking-widest text-on-surface-variant/60 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full bg-surface-container-high/50 border border-outline-variant/20 rounded-lg py-2.5 px-4 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary/50 transition-colors resize-none disabled:opacity-50"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {error && (
                  <p className="text-xs text-red-400 text-center">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading || isSubmitted}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-heading text-sm transition-all duration-300 group ${
                    isSubmitted
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "bg-primary text-on-primary hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                  }`}
                >
                  {loading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : isSubmitted ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Decorative Line */}
        <div
          className={`relative mt-16 transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="h-px w-full bg-linear-to-r from-transparent via-outline-variant/30 to-transparent" />
          <div className="absolute left-1/2 top-1 -translate-x-1/2 -translate-y-1/2 px-4 bg-surface-container/30">
            <span className="font-mono text-[8px] uppercase tracking-widest text-on-surface-variant/30">
              Let's Build Something Great
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
