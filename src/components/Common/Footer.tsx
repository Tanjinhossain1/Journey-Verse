import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-900 to-purple-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Journey Verse</h3>
            <p className="text-sm">
              Discover the world with us. From exotic beaches to bustling
              cities, {`we've`} got your next adventure covered.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-blue-200 transition-colors">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="hover:text-blue-200 transition-colors">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="#" className="hover:text-blue-200 transition-colors">
                <Twitter className="h-6 w-6" />
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-xl font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:underline">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Tours & Packages
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Travel Guides
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-xl font-semibold">Contact Us</h4>
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>tanjinhossain2003@gmail.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5" />
              <span>+(880) 1861557343</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span className="text-sm">2 No Dhakessory 373, Narayanganj</span>
            </div>
          </div>
          <div className="w-full h-52 mt-8">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30596698663!2d-74.25986652089463!3d40.69714942211053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1635786994961!5m2!1sen!2s"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map"
        ></iframe>
      </div>
        </div>
        <div className="mt-12 border-t border-blue-400 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">
            &copy; 2024 Wanderlust Travels. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <Link href="#" className="text-sm hover:underline mr-4">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
