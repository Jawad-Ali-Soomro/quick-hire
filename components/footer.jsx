import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-black dark:bg-white text-white dark:text-black">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          <div>
            <h3 className="text-white dark:text-black font-semibold mb-4">Thumbtack</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-white/80 dark:text-black/80 hover:text-white dark:hover:text-black transition-colors">About</Link></li>
              <li><Link href="#" className="text-sm text-white/80 dark:text-black/80 hover:text-white dark:hover:text-black transition-colors">Partner with us</Link></li>
              <li><Link href="#" className="text-sm text-white/80 dark:text-black/80 hover:text-white dark:hover:text-black transition-colors">For developers</Link></li>
              <li><Link href="#" className="text-sm text-white/80 dark:text-black/80 hover:text-white dark:hover:text-black transition-colors">Careers</Link></li>
              <li><Link href="#" className="text-sm text-white/80 dark:text-black/80 hover:text-white dark:hover:text-black transition-colors">Press</Link></li>
              <li><Link href="#" className="text-sm text-white/80 dark:text-black/80 hover:text-white dark:hover:text-black transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white dark:text-black font-semibold mb-4">Customers</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-white/80 dark:text-black/80 hover:text-white dark:hover:text-black transition-colors">How to use Quick Hire</Link></li>
              <li><Link href="#" className="text-sm text-white/80 dark:text-black/80 hover:text-white dark:hover:text-black transition-colors">Sign up</Link></li>
              <li><Link href="#" className="text-sm text-white/80 dark:text-black/80 hover:text-white dark:hover:text-black transition-colors">Get the app</Link></li>
              <li><Link href="#" className="text-sm text-white/80 dark:text-black/80 hover:text-white dark:hover:text-black transition-colors">Services near me</Link></li>
              <li><Link href="#" className="text-sm text-white/80 dark:text-black/80 hover:text-white dark:hover:text-black transition-colors">Cost estimates</Link></li>
              <li><Link href="#" className="text-sm text-white/80 dark:text-black/80 hover:text-white dark:hover:text-black transition-colors">Home resource center</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white dark:text-black font-semibold mb-4">Pros</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-white/80 dark:text-black/80 hover:text-white dark:hover:text-black transition-colors">Quick Hire for pros</Link></li>
              <li><Link href="#" className="text-sm text-white/80 dark:text-black/80 hover:text-white dark:hover:text-black transition-colors">Sign up as a pro</Link></li>
              <li><Link href="#" className="text-sm text-white/80 dark:text-black/80 hover:text-white dark:hover:text-black transition-colors">Community</Link></li>
              <li><Link href="#" className="text-sm text-white/80 dark:text-black/80 hover:text-white dark:hover:text-black transition-colors">Pro Resources</Link></li>
              <li><Link href="#" className="text-sm text-white/80 dark:text-black/80 hover:text-white dark:hover:text-black transition-colors">Pro reviews</Link></li>
              <li><Link href="#" className="text-sm text-white/80 dark:text-black/80 hover:text-white dark:hover:text-black transition-colors">iPhone app for pros</Link></li>
              <li><Link href="#" className="text-sm text-white/80 dark:text-black/80 hover:text-white dark:hover:text-black transition-colors">Android app for pros</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white dark:text-black font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-white/80 dark:text-black/80 hover:text-white dark:hover:text-black transition-colors">Help</Link></li>
              <li><Link href="#" className="text-sm text-white/80 dark:text-black/80 hover:text-white dark:hover:text-black transition-colors">Safety</Link></li>
              <li><Link href="#" className="text-sm text-white/80 dark:text-black/80 hover:text-white dark:hover:text-black transition-colors">Terms of Use</Link></li>
              <li><Link href="#" className="text-sm text-white/80 dark:text-black/80 hover:text-white dark:hover:text-black transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm text-white/80 dark:text-black/80 hover:text-white dark:hover:text-black transition-colors">CA Notice at Collection</Link></li>
              <li><Link href="#" className="text-sm text-white/80 dark:text-black/80 hover:text-white dark:hover:text-black transition-colors">Do not Sell or Share My Personal Information</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 dark:border-black/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-white/80 dark:text-black/80 mb-4 md:mb-0">
              © {new Date().getFullYear()} Quick Hire<sup className="text-xs align-super">™</sup>, Inc.
            </p>
            <p className="text-sm text-white/80 dark:text-black/80">
              Quick Hire Guarantee
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

