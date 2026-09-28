import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Bookmark, Share, Type, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="flex flex-col mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8 py-8 gap-12">
      
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
        <div className="flex flex-col gap-6 flex-1">
          <Badge className="w-fit">Environment</Badge>
          <h1 className="text-display-1 font-serif text-neutral-900 leading-tight">
            Clean Energy Shift Speeds Up as Nations Invest in a Greener Future
          </h1>
          <p className="text-body-lg text-neutral-500">
            Countries around the world are accelerating their transition to clean energy, with new investments, innovative technologies and stronger climate policies shaping a more sustainable tomorrow.
          </p>
          <div className="flex items-center gap-2 text-small text-neutral-400">
            <Clock className="w-4 h-4" />
            <span>May 16, 2025 · 6 min read</span>
          </div>
          <Button className="w-fit gap-2">
            Read Full Story <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex-1 w-full relative aspect-[4/3] lg:aspect-[3/2] overflow-hidden rounded-lg bg-neutral-100 group cursor-pointer">
          <Image
            src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=2670&auto=format&fit=crop"
            alt="Wind turbines and solar panels"
            fill
            className="object-cover transition-opacity duration-300 group-hover:opacity-0"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-primary-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h4 className="font-serif font-bold text-heading-3 text-primary-900 mb-2">Did You Know?</h4>
            <p className="text-body font-medium text-primary-800 text-center">
              Renewable energy sources provided a record 30% of global electricity in 2023, largely driven by rapid growth in solar and wind power installations.
            </p>
          </div>
        </div>
      </section>

      {/* 3 Secondary Stories */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex gap-4 p-4 rounded-md border border-neutral-200">
          <div className="flex flex-col gap-3 flex-1 justify-between">
            <div className="flex flex-col gap-2">
              <Badge className="w-fit">Business</Badge>
              <h3 className="text-heading-3 font-serif font-bold text-neutral-900">
                Global Markets Show Renewed Optimism After Strong Earnings
              </h3>
              <p className="text-small text-neutral-500 line-clamp-2">
                Investor confidence rises as major companies report better-than-expected results, signaling...
              </p>
            </div>
            <div className="flex items-center gap-2 text-tiny text-neutral-400">
              <Clock className="w-3 h-3" />
              <span>May 16, 2025 · 4 min read</span>
            </div>
          </div>
          <div className="relative w-24 h-24 rounded-default overflow-hidden shrink-0 bg-neutral-100">
            <Image
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop"
              alt="City skyline"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex gap-4 p-4 rounded-md border border-neutral-200">
          <div className="flex flex-col gap-3 flex-1 justify-between">
            <div className="flex flex-col gap-2">
              <Badge className="w-fit">Technology</Badge>
              <h3 className="text-heading-3 font-serif font-bold text-neutral-900">
                The Next Generation of AI Tools Is More Human-Centered
              </h3>
              <p className="text-small text-neutral-500 line-clamp-2">
                Researchers say new models are becoming more helpful, safe and aligned with human values.
              </p>
            </div>
            <div className="flex items-center gap-2 text-tiny text-neutral-400">
              <Clock className="w-3 h-3" />
              <span>May 14, 2025 · 5 min read</span>
            </div>
          </div>
          <div className="relative w-24 h-24 rounded-default overflow-hidden shrink-0 bg-neutral-100">
            <Image
              src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop"
              alt="AI processor"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex gap-4 p-4 rounded-md border border-neutral-200">
          <div className="flex flex-col gap-3 flex-1 justify-between">
            <div className="flex flex-col gap-2">
              <Badge className="w-fit">Health</Badge>
              <h3 className="text-heading-3 font-serif font-bold text-neutral-900">
                Simple Lifestyle Changes Can Add Years to Your Life
              </h3>
              <p className="text-small text-neutral-500 line-clamp-2">
                Experts say better sleep, balanced nutrition and daily movement can significantly improve long-term health.
              </p>
            </div>
            <div className="flex items-center gap-2 text-tiny text-neutral-400">
              <Clock className="w-3 h-3" />
              <span>May 13, 2025 · 4 min read</span>
            </div>
          </div>
          <div className="relative w-24 h-24 rounded-default overflow-hidden shrink-0 bg-neutral-100">
            <Image
              src="https://images.unsplash.com/photo-1542314831-c6a4d14d8379?q=80&w=2670&auto=format&fit=crop"
              alt="Person in nature"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Two Column Layout */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Latest News Column */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-start justify-between">
              <h2 className="text-heading-2 font-serif font-bold text-neutral-900">Latest News</h2>
              <Link href="#" className="flex items-center gap-1 text-small font-medium text-neutral-900 hover:text-primary-500 transition-colors shrink-0 mt-1">
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <p className="text-small text-neutral-500 pr-12">Stay informed with the latest updates from around the world.</p>
          </div>
          
          <div className="flex flex-col gap-6">
            {[
              { cat: "World", title: "New Peace Talks Offer Hope for Lasting Stability", desc: "Diplomats say renewed dialogue could help ease tensions and build a more peaceful future.", img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=2698&auto=format&fit=crop" },
              { cat: "Business", title: "Small Businesses Lead the Way in Digital Innovation", desc: "From local shops to startups, entrepreneurs are using technology to reach new customers and grow faster.", img: "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?q=80&w=2532&auto=format&fit=crop" },
              { cat: "Sports", title: "Young Athletes Inspire a New Generation", desc: "Their dedication, discipline and positive mindset are changing the future of sports.", img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2670&auto=format&fit=crop" }
            ].map((news, i) => (
              <div key={i} className="flex gap-4">
                <div className="relative w-32 h-24 rounded-md overflow-hidden shrink-0 bg-neutral-100">
                  <Image
                    src={news.img}
                    alt={news.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Badge className="w-fit text-[10px] px-1.5 py-0">{news.cat}</Badge>
                  <h4 className="font-serif font-bold text-body-lg text-neutral-900 leading-tight">{news.title}</h4>
                  <p className="text-tiny text-neutral-500 line-clamp-2">{news.desc}</p>
                  <div className="flex items-center gap-2 text-[10px] text-neutral-400">
                    <Clock className="w-3 h-3" />
                    <span>May 15, 2025 · 3 min read</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Topics Column */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex flex-col">
            <h2 className="text-heading-2 font-serif font-bold text-neutral-900">Featured Topics</h2>
            <p className="text-small text-neutral-500">Explore news and insights by topic.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {[
              { name: "Climate & Environment", img: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=2641&auto=format&fit=crop", icon: "🌱" },
              { name: "Technology & Innovation", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop", icon: "💻" },
              { name: "Global Affairs", img: "https://images.unsplash.com/photo-1526778548025-fa2fbf5cb1ce?q=80&w=2612&auto=format&fit=crop", icon: "🌍" },
              { name: "Health & Wellness", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2670&auto=format&fit=crop", icon: "❤️" },
              { name: "Business & Economy", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2671&auto=format&fit=crop", icon: "📈" }
            ].map((topic, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-neutral-100 flex items-center justify-center group cursor-pointer">
                  <Image src={topic.img} alt={topic.name} fill className="object-cover transition-transform group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="relative z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl shadow-md">
                    {topic.icon}
                  </div>
                </div>
                <span className="text-tiny font-bold text-center text-neutral-900">{topic.name}</span>
              </div>
            ))}
          </div>

          <div className="mt-auto bg-primary-100 rounded-lg p-8 flex flex-col items-center text-center gap-4 border border-primary-200">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0 mb-2">
              <Mail className="w-6 h-6 text-primary-500" />
            </div>
            <h3 className="font-serif text-heading-3 font-bold text-neutral-900">Get the best of Serene Lavoisier delivered to your inbox</h3>
            <p className="text-small text-neutral-500 mb-2">Stay updated with the latest news, insights and stories that matter - straight to your email.</p>
            <div className="flex flex-col gap-1.5 w-full max-w-md">
              <label className="text-small font-medium text-neutral-900 sr-only" htmlFor="newsletter-email">Email address</label>
              <div className="flex items-center gap-2">
                <Input id="newsletter-email" type="email" placeholder="Enter your email address" className="w-full h-9 text-sm rounded-md" />
                <Button size="sm" className="h-9 px-4 text-sm rounded-md shrink-0">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Large Editorial Feature */}
      <section className="flex flex-col md:flex-row gap-8 p-6 rounded-xl border border-neutral-200 bg-white shadow-sm items-center">
        <div className="relative w-full md:w-1/2 aspect-[4/3] rounded-lg overflow-hidden bg-neutral-100 group cursor-pointer">
          <Image
            src="https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=2670&auto=format&fit=crop"
            alt="Cityscape"
            fill
            className="object-cover transition-opacity duration-300 group-hover:opacity-0"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-primary-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h4 className="font-serif font-bold text-heading-3 text-primary-900 mb-2">Smart Fact</h4>
            <p className="text-body font-medium text-primary-800 text-center">
              Smart city initiatives are projected to save over 2.5 billion hours of commuting time worldwide each year by optimizing traffic flows.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-6 w-full md:w-1/2 md:pr-12 relative">
          <div className="absolute top-0 right-0 hidden md:flex flex-col gap-4 text-neutral-400">
            <button className="hover:text-primary-500"><Bookmark className="w-5 h-5" /></button>
            <button className="hover:text-primary-500"><Share className="w-5 h-5" /></button>
            <button className="hover:text-primary-500"><Type className="w-5 h-5" /></button>
          </div>
          <div className="flex flex-col gap-4">
            <Badge className="w-fit">World</Badge>
            <h2 className="text-display-2 font-serif font-bold text-neutral-900 leading-tight">
              Cities of the Future: Smarter, Greener and More Livable
            </h2>
            <div className="flex items-center gap-3 text-small text-neutral-500">
              <div className="w-6 h-6 rounded-full overflow-hidden relative bg-neutral-200">
                 <Image src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop" fill alt="Author" className="object-cover" />
              </div>
              <span className="font-medium text-neutral-900">By Elena Brooks</span>
              <span><Clock className="w-3 h-3 inline mr-1" /> May 16, 2025 · 7 min read</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-4 text-body text-neutral-600">
            <p>
              As urban populations continue to grow, cities around the world are reimagining what it means to be livable. From green infrastructure to smart technology, forward-thinking leaders are building cities that are not only more efficient, but also healthier, safer and more inclusive for everyone.
            </p>
            <blockquote className="border-l-4 border-primary-500 pl-4 py-1 italic font-serif text-heading-3 text-neutral-900 bg-primary-50/50 rounded-r-md">
              &quot;The future of our cities isn&apos;t just about technology - it&apos;s about people, nature and opportunity working together.&quot;
            </blockquote>
            <p>
              Innovations in clean energy, sustainable transport and green spaces are helping cities reduce their carbon footprint while improving quality of life. The changes we see today could set the foundation for a more resilient and equitable tomorrow.
            </p>
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="p-12 rounded-xl bg-neutral-100 flex flex-col justify-center items-center gap-6 relative overflow-hidden min-h-[300px]">
        <Image src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2670&auto=format&fit=crop" fill alt="Mountains" className="object-cover opacity-20" />
        <div className="relative z-10 flex flex-col items-center text-center gap-4">
          <svg
            width="48"
            height="48"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary-500"
          >
            <path d="M16 2L2 12V28L16 30L30 28V12L16 2Z" fill="currentColor" />
            <path d="M16 8L8 14V24L16 26L24 24V14L16 8Z" fill="white" />
          </svg>
          <div className="flex flex-col mb-4">
            <span className="font-sans text-[20px] font-bold leading-tight tracking-tight text-neutral-900">
              Serene
            </span>
            <span className="font-sans text-[20px] font-bold leading-tight tracking-tight text-neutral-900">
              Lavoisier
            </span>
          </div>
          <h4 className="font-serif font-bold text-heading-3 text-neutral-900">Better News. A Brighter Tomorrow.</h4>
          <p className="text-small text-neutral-600 px-4 max-w-lg">Thoughtful journalism for a more informed, connected and sustainable world.</p>
        </div>
      </section>

    </div>
  );
}
