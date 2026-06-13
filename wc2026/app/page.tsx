import { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import LiveMatches from '@/components/home/LiveMatches';
import Standings from '@/components/home/Standings';
import TeamsSection from '@/components/home/TeamsSection';
import NewsSection from '@/components/home/NewsSection';

export const metadata: Metadata = {
  title: 'FIFA World Cup 2026 | Live Scores, Schedule & News',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <LiveMatches />
      <Standings />
      <TeamsSection />
      <NewsSection />
    </>
  );
}
