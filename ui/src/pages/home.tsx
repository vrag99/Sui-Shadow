import {
  Header,
  HeroSection,
  FeaturesSection,
  HowItWorksSection,
  UseCasesSection,
  CallToActionSection,
  Footer,
} from "@/components/landing-page";
import { useWallet } from "@suiet/wallet-kit";

const HomePage = () => {
  const { connected } = useWallet();
  console.log(connected);
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <UseCasesSection />
        <CallToActionSection />
      </main>
      <Footer />
    </div>
  );
};

export { HomePage };
