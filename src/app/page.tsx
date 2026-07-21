import { SiteHeader } from "@/components/sections/SiteHeader";
import { HeroLogo } from "@/components/sections/HeroLogo";
import { Hero } from "@/components/sections/Hero/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Manifesto } from "@/components/sections/Manifesto";
import { Process } from "@/components/sections/Process";
import { FeaturedWorks } from "@/components/sections/FeaturedWorks";
import { PressMarquee } from "@/components/sections/PressMarquee";
import { StudioFilm } from "@/components/sections/StudioFilm";
import { Voices } from "@/components/sections/Voices";
import { AuthorSpotlight } from "@/components/sections/AuthorSpotlight";
import { Services } from "@/components/sections/Services";
import { GlobalReach } from "@/components/sections/GlobalReach";
import { BeginYourBook } from "@/components/sections/BeginYourBook";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { ChapterSpine } from "@/components/ui/ChapterSpine";

/**
 * The single marketing page. All sections are SSR'd (their copy ships in the
 * HTML). Phase 3 will wrap this in the PreloaderGate; later phases add bespoke
 * scroll animation inside each section.
 */
export default function Home() {
  return (
    <>
      <SiteHeader />
      <HeroLogo />
      <ChapterSpine />
      <main id="main">

        <Hero />
        <TrustBar />
        <Manifesto />
        <Process />
        <FeaturedWorks />
        <PressMarquee />
        <StudioFilm />
        <Voices />
        <AuthorSpotlight />
        <Services />
        <GlobalReach />
        <BeginYourBook />
      </main>
      <SiteFooter />
    </>
  );
}
