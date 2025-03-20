import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-transparent shadow-md shadow-amber-200/70  p-4 text-white flex-row md:flex justify-between">
      <h1 className="text-xl font-bold">Coupon System</h1>
      <div>
        <Link href="/" className="mr-4 hover:underline">Home</Link>
        <Link href="/admin" className="mr-4 hover:underline">Admin</Link>
        <Link href="/dashboard" className="hover:underline">Dashboard</Link>
      </div>
    </nav>
  );
};

export default Navbar;
