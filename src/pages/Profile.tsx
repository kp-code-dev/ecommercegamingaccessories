import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Heading from "@/components/ui/Heading";
import { useAuth } from "@/context/AuthContext";
import { BiSolidUserCircle } from "react-icons/bi";

function Profile() {
  const { user } = useAuth();

  return (
    <>
      <Header />
      <main className="pt-24 pb-16 min-h-screen">
        <div className="max-w-2xl mx-auto px-4">
          <Heading title="Profile" />
          {user ? (
            <div className="bg-card border border-border rounded-lg p-8 flex flex-col items-center gap-4">
              <BiSolidUserCircle className="text-primary" size={80} />
              <h2 className="font-heading text-xl text-foreground">{user.name}</h2>
              <p className="text-muted-foreground font-body">{user.email}</p>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <p className="text-muted-foreground font-body">Please login to view your profile.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Profile;
