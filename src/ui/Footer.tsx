const newDate = new Date();
const year = newDate.getFullYear().toString();

export default function Footer() {
  return (
    <footer className="rounded bg-slate-600 text-white py-4">
      <p className="text-center">&copy; {year} All right reserved by XYZ company</p>
    </footer>
  );
}
