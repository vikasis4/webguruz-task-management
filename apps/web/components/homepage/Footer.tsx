export default function Footer() {
  return (
    <footer className="px-6 py-6 border-t bg-white text-center text-sm text-gray-500">
      © {new Date().getFullYear()} TaskMaster. All rights reserved.
    </footer>
  );
}
