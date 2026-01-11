import { Activity, Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      {/* CTA Section */}
      <div className="section-padding border-b border-background/10">
        <div className="container-custom">
          <div className="glass-card bg-gradient-primary p-12 rounded-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Transform Your Health?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of users who have achieved their fitness goals with our personalized nutrition plans
            </p>
            <Button variant="glass" size="xl" className="bg-background text-foreground hover:bg-background/90">
              Get Started Free
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="section-padding pb-8">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                  <Activity className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-2xl font-bold">NutriLife</span>
              </div>
              <p className="text-background/70">
                Your trusted partner in achieving optimal health through science-backed nutrition guidance.
              </p>
              <div className="flex gap-4">
                {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                  <a 
                    key={index} 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {['BMI Calculator', 'Meal Plans', 'Nutrition Tips', 'About Us', 'Blog'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-background/70 hover:text-primary transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-3">
                {['Personalized Plans', 'Fitness Coaching', 'Diet Consultation', 'Meal Prep Guides', 'Premium Support'].map((service) => (
                  <li key={service}>
                    <a href="#" className="text-background/70 hover:text-primary transition-colors">
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-background/70">
                  <Mail className="w-5 h-5 text-primary" />
                  <span>hello@nutrilife.com</span>
                </li>
                <li className="flex items-center gap-3 text-background/70">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-start gap-3 text-background/70">
                  <MapPin className="w-5 h-5 text-primary shrink-0" />
                  <span>123 Health Street, Wellness City, WC 12345</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/50">
            <p>© 2025 NutriLife. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
