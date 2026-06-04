export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-white py-10">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-6 px-6 sm:flex-row lg:px-10">
        <p className="text-sm text-muted-foreground text-center sm:text-left">
          &copy; {new Date().getFullYear()} PT Eltran Indonesia. All rights reserved.<br/>
          Secure Vendor Management System.
        </p>
        <div className="flex gap-4 text-sm font-medium text-muted-foreground">
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-primary transition-colors">Support</a>
        </div>
      </div>
    </footer>
  );
}
