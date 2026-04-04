import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { FaSearch, FaBars } from "react-icons/fa";
import { BiSolidUserCircle } from "react-icons/bi";
import { IoMdLogOut } from "react-icons/io";
import { useCart } from "@/context/CartContext";
import CartDropdown from "@/components/cart/CartDropdown";
import { useAuth } from "@/context/AuthContext";
import AuthModal from "@/components/auth/AuthModal";

function Header() {
  const { user, logout, openLoginModal, closeLoginModal, isLoginModalOpen } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { cartCount } = useCart();
  const searchRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [searchOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const executeSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/store?search=${encodeURIComponent(searchTerm)}`);
      setSearchOpen(false);
      setMobileMenuOpen(false);
      setSearchTerm("");
    } else {
      setSearchOpen(false);
    }
  };

  const handleDesktopSearch = () => {
    if (!searchOpen) setSearchOpen(true);
    else executeSearch();
  };

  const navLinkClass = "text-secondary-foreground no-underline font-semibold uppercase font-heading text-sm relative transition-colors duration-300 hover:text-foreground";

  return (
    <header className="fixed w-full top-0 z-50 flex justify-between items-center px-4 md:px-12 py-2 backdrop-blur-xl border-b border-border bg-background/80">
      <Link to="/" className="flex items-center gap-3 no-underline">
        <div className="flex flex-col leading-tight">
          <span className="font-heading text-lg md:text-xl font-extrabold text-foreground uppercase tracking-wider">
            WORLD OF MSD
          </span>
          <span className="font-body text-xs md:text-sm font-bold text-primary uppercase tracking-[3px]">
            Gaming Accessories
          </span>
        </div>
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-5">
        <NavLink to="/" className={navLinkClass}>Home</NavLink>
        <NavLink to="/store" className={navLinkClass}>Store</NavLink>
        <NavLink to="/custom-builds" className={navLinkClass}>Custom Builds</NavLink>

        <div className="flex items-center gap-1 relative" ref={searchRef}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search Products..."
            className={`bg-transparent text-foreground border-b border-primary px-2 py-1 font-heading text-sm transition-all duration-300 outline-none ${searchOpen ? "w-48 opacity-100" : "w-0 opacity-0"}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && executeSearch()}
          />
          <button onClick={handleDesktopSearch} className="bg-transparent border-none text-secondary-foreground hover:text-foreground transition-colors p-1">
            <FaSearch />
          </button>
        </div>

        <div className="relative">
          <button onClick={() => setCartOpen(!cartOpen)} className="bg-transparent border-none text-secondary-foreground hover:text-foreground transition-colors p-1 relative">
            <FaCartShopping size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[0.65rem] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-[var(--glow-primary-sm)]">
                {cartCount}
              </span>
            )}
          </button>
          {cartOpen && <CartDropdown onClose={() => setCartOpen(false)} />}
        </div>

        <div className="relative" ref={profileRef}>
          <button onClick={() => user ? setProfileOpen(!profileOpen) : openLoginModal()} className="bg-transparent border-none text-secondary-foreground hover:text-foreground transition-colors p-1">
            <BiSolidUserCircle size={28} />
          </button>
          {user && profileOpen && (
            <div className="absolute top-12 right-0 w-48 bg-card/95 border border-border rounded-lg shadow-xl backdrop-blur-lg z-50 overflow-hidden">
              <div className="flex flex-col">
                <Link to="/profile" onClick={() => setProfileOpen(false)} className="px-4 py-2.5 text-secondary-foreground text-sm font-body font-semibold hover:bg-muted hover:text-foreground transition-all border-b border-border no-underline">Profile</Link>
                <Link to="/my-orders" onClick={() => setProfileOpen(false)} className="px-4 py-2.5 text-secondary-foreground text-sm font-body font-semibold hover:bg-muted hover:text-foreground transition-all border-b border-border no-underline">My Orders</Link>
                <button onClick={() => { setProfileOpen(false); logout(); }} className="px-4 py-2.5 bg-transparent border-none text-destructive font-heading font-bold text-sm text-left flex items-center gap-2 hover:bg-destructive/10 transition-all cursor-pointer">
                  Log Out <IoMdLogOut />
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Nav */}
      <div className="flex md:hidden items-center gap-3">
        <button onClick={() => setCartOpen(!cartOpen)} className="bg-transparent border-none text-secondary-foreground hover:text-foreground transition-colors p-1 relative">
          <FaCartShopping size={20} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[0.65rem] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
        <button onClick={() => user ? setProfileOpen(!profileOpen) : openLoginModal()} className="bg-transparent border-none text-secondary-foreground hover:text-foreground transition-colors p-1">
          <BiSolidUserCircle size={28} />
        </button>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="bg-transparent border-none text-secondary-foreground hover:text-foreground transition-colors p-1">
          <FaBars size={20} />
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-background/95 backdrop-blur-xl border-b border-border shadow-2xl py-6 flex flex-col items-center gap-4 md:hidden z-40">
          <div className="flex items-center gap-2 w-4/5">
            <input
              type="text"
              placeholder="Search Products..."
              className="bg-transparent text-foreground border-b border-primary px-2 py-2 font-heading text-sm w-full outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && executeSearch()}
            />
            <button onClick={executeSearch} className="bg-transparent border-none text-secondary-foreground hover:text-foreground p-1">
              <FaSearch />
            </button>
          </div>
          <NavLink to="/" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>Home</NavLink>
          <NavLink to="/store" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>Store</NavLink>
          <NavLink to="/custom-builds" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>Custom Builds</NavLink>
        </div>
      )}

      <AuthModal open={isLoginModalOpen} onClose={closeLoginModal} />
    </header>
  );
}

export default Header;
