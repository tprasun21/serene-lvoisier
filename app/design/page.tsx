import React from 'react';
import { 
  Home, Search, Bell, Bookmark, User, Settings, Share2, Heart, 
  MessageSquare, ArrowLeft, ArrowRight, ExternalLink, Menu, Play, Pause, Clock,
  CheckCircle, AlertCircle, XCircle, ChevronDown, ChevronLeft, ChevronRight, X,
  FileText, Download, LogOut, Info, AlertTriangle, Image as ImageIcon
} from 'lucide-react';

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-neutral-100 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        
        {/* Header */}
        <div className="p-8 border-b border-neutral-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-primary-500 rounded flex items-center justify-center text-white font-bold text-2xl">
              V
            </div>
            <div>
              <h1 className="text-3xl font-serif font-semibold text-neutral-900">Serene Lavoisier</h1>
              <p className="text-neutral-500 text-sm">Real News. Deeper Perspectives.</p>
            </div>
          </div>
          <h2 className="text-4xl font-semibold mb-2">Design System</h2>
          <p className="text-neutral-500 max-w-2xl">
            A unified design language for Serene Lavoisier, a modern news portal that delivers credible, 
            insightful and engaging stories — with clarity, consistency and intuitive user experiences.
          </p>
          <div className="mt-4 text-xs font-medium text-neutral-400">
            VERSION 1.0 • MAY 2025
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Column 1 */}
          <div className="md:col-span-8 space-y-12">
            
            {/* 01 COLOR TOKENS */}
            <section>
              <h3 className="text-sm font-semibold text-neutral-400 mb-6 flex items-center gap-2">
                <span className="text-primary-500">01</span> COLOR TOKENS
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-3">Primary (Orange)</h4>
                  <div className="flex gap-4">
                    {[
                      { hex: '#FF682D', num: '500', name: 'Primary' },
                      { hex: '#FF8A3D', num: '400', name: 'Hover' },
                      { hex: '#FFA66B', num: '300', name: 'Light' },
                      { hex: '#FFD0B3', num: '200', name: 'Lighter' },
                      { hex: '#FFF4ED', num: '100', name: 'Bg' },
                    ].map((c) => (
                      <div key={c.hex} className="w-20">
                        <div className="w-16 h-16 rounded-full mb-2" style={{ backgroundColor: c.hex }}></div>
                        <div className="text-xs font-medium text-neutral-900">{c.hex}</div>
                        <div className="text-xs text-neutral-500">{c.num}</div>
                        <div className="text-xs text-neutral-500">{c.name}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-3">Neutral</h4>
                  <div className="flex gap-4">
                    {[
                      { hex: '#111827', num: '900', name: 'Text' },
                      { hex: '#374151', num: '700', name: 'Heading' },
                      { hex: '#6B7280', num: '500', name: 'Body' },
                      { hex: '#9CA3AF', num: '400', name: 'Muted' },
                      { hex: '#E5E7EB', num: '200', name: 'Border' },
                      { hex: '#F3F4F6', num: '100', name: 'Surface' },
                    ].map((c) => (
                      <div key={c.hex} className="w-20">
                        <div className="w-16 h-16 rounded-full mb-2 border border-neutral-200" style={{ backgroundColor: c.hex }}></div>
                        <div className="text-xs font-medium text-neutral-900">{c.hex}</div>
                        <div className="text-xs text-neutral-500">{c.num}</div>
                        <div className="text-xs text-neutral-500">{c.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* 03 TYPE SCALE */}
            <section>
              <h3 className="text-sm font-semibold text-neutral-400 mb-6 flex items-center gap-2">
                <span className="text-primary-500">03</span> TYPE SCALE
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-neutral-500 border-b border-neutral-200">
                      <th className="pb-3 font-normal">Style</th>
                      <th className="pb-3 font-normal">Size</th>
                      <th className="pb-3 font-normal">Line Height</th>
                      <th className="pb-3 font-normal">Weight</th>
                      <th className="pb-3 font-normal">Usage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    <tr className="text-neutral-900">
                      <td className="py-3 font-semibold text-[48px] leading-[56px] font-serif">Display 1</td>
                      <td className="py-3">48 / 56</td>
                      <td className="py-3">1.2</td>
                      <td className="py-3">SemiBold</td>
                      <td className="py-3 text-neutral-500">Hero titles</td>
                    </tr>
                    <tr className="text-neutral-900">
                      <td className="py-3 font-semibold text-[36px] leading-[44px] font-serif">Display 2</td>
                      <td className="py-3">36 / 44</td>
                      <td className="py-3">1.2</td>
                      <td className="py-3">SemiBold</td>
                      <td className="py-3 text-neutral-500">Section titles</td>
                    </tr>
                    <tr className="text-neutral-900">
                      <td className="py-3 font-semibold text-[28px] leading-[36px] font-sans">Heading 1</td>
                      <td className="py-3">28 / 36</td>
                      <td className="py-3">1.3</td>
                      <td className="py-3">SemiBold</td>
                      <td className="py-3 text-neutral-500">Card titles</td>
                    </tr>
                    <tr className="text-neutral-900">
                      <td className="py-3 font-medium text-[24px] leading-[32px] font-sans">Heading 2</td>
                      <td className="py-3">24 / 32</td>
                      <td className="py-3">1.3</td>
                      <td className="py-3">Medium</td>
                      <td className="py-3 text-neutral-500">Section headers</td>
                    </tr>
                    <tr className="text-neutral-900">
                      <td className="py-3 font-medium text-[20px] leading-[28px] font-sans">Heading 3</td>
                      <td className="py-3">20 / 28</td>
                      <td className="py-3">1.4</td>
                      <td className="py-3">Medium</td>
                      <td className="py-3 text-neutral-500">Subtitles</td>
                    </tr>
                    <tr className="text-neutral-900">
                      <td className="py-3 text-[18px] leading-[26px] font-serif">Body Large</td>
                      <td className="py-3">18 / 26</td>
                      <td className="py-3">1.4</td>
                      <td className="py-3">Regular</td>
                      <td className="py-3 text-neutral-500">Article text</td>
                    </tr>
                    <tr className="text-neutral-900">
                      <td className="py-3 text-[16px] leading-[24px] font-sans">Body</td>
                      <td className="py-3">16 / 24</td>
                      <td className="py-3">1.5</td>
                      <td className="py-3">Regular</td>
                      <td className="py-3 text-neutral-500">Body text</td>
                    </tr>
                    <tr className="text-neutral-900">
                      <td className="py-3 text-[14px] leading-[20px] font-sans">Small</td>
                      <td className="py-3">14 / 20</td>
                      <td className="py-3">1.4</td>
                      <td className="py-3">Regular</td>
                      <td className="py-3 text-neutral-500">Captions, meta</td>
                    </tr>
                    <tr className="text-neutral-900">
                      <td className="py-3 text-[12px] leading-[16px] font-sans">Tiny</td>
                      <td className="py-3">12 / 16</td>
                      <td className="py-3">1.4</td>
                      <td className="py-3">Regular</td>
                      <td className="py-3 text-neutral-500">Labels, tags</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

          </div>

          {/* Column 2 */}
          <div className="md:col-span-4 space-y-12">
            
            {/* Semantic Colors */}
            <section>
              <h3 className="text-sm font-semibold text-transparent mb-6 h-5"></h3>
              <div>
                <h4 className="text-sm font-medium mb-3">Semantic</h4>
                <div className="flex gap-4">
                  {[
                    { hex: '#10B981', name: 'Success' },
                    { hex: '#3B82F6', name: 'Info' },
                    { hex: '#F59E0B', name: 'Warning' },
                    { hex: '#EF4444', name: 'Error' },
                  ].map((c) => (
                    <div key={c.hex} className="w-16">
                      <div className="w-12 h-12 rounded-full mb-2" style={{ backgroundColor: c.hex }}></div>
                      <div className="text-xs font-medium text-neutral-900">{c.hex}</div>
                      <div className="text-xs text-neutral-500">{c.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 02 TYPOGRAPHY */}
            <section>
              <h3 className="text-sm font-semibold text-neutral-400 mb-6 flex items-center gap-2">
                <span className="text-primary-500">02</span> TYPOGRAPHY
              </h3>
              
              <div className="space-y-8">
                <div>
                  <div className="flex gap-4">
                    <div className="text-5xl font-sans font-medium text-neutral-900">Aa</div>
                    <div>
                      <div className="font-semibold text-lg font-sans">Poppins</div>
                      <div className="text-sm text-neutral-500 mb-2">UI / Headings / Buttons / Navigation</div>
                      <div className="text-xs tracking-widest text-neutral-400 break-all">ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
                      <div className="text-xs text-neutral-400 break-all">abcdefghijklmnopqrstuvwxyz</div>
                      <div className="text-xs text-neutral-400">0123456789</div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex gap-4">
                    <div className="text-5xl font-serif text-neutral-900">Aa</div>
                    <div>
                      <div className="font-semibold text-lg font-serif flex items-center gap-2">
                        Newsreader <span className="text-xs font-normal text-neutral-400 bg-neutral-100 px-1 rounded border border-neutral-200">Recommended</span>
                      </div>
                      <div className="text-sm text-neutral-500 mb-2">Display / Editorial / Articles</div>
                      <div className="text-xs tracking-widest text-neutral-400 break-all">ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
                      <div className="text-xs text-neutral-400 break-all">abcdefghijklmnopqrstuvwxyz</div>
                      <div className="text-xs text-neutral-400">0123456789</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Components Section */}
        <div className="p-8 border-t border-neutral-200 grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Column 1 */}
          <div className="md:col-span-6 space-y-12">
            
            {/* 04 SPACING & 05 RADIUS */}
            <div className="flex flex-col xl:flex-row gap-12">
              <section className="flex-1">
                <h3 className="text-sm font-semibold text-neutral-400 mb-6 flex items-center gap-2">
                  <span className="text-primary-500">04</span> SPACING SYSTEM
                </h3>
                <div className="text-xs text-neutral-500 mb-4">Base unit: 4px</div>
                <div className="flex items-end gap-3 h-24">
                  {[4, 8, 12, 16, 24, 32, 40, 48, 64].map(s => (
                    <div key={s} className="flex flex-col items-center">
                      <div className="bg-primary-100 w-full" style={{ height: s, minWidth: '16px' }}></div>
                      <div className="text-[10px] mt-2 font-medium">{s}</div>
                      <div className="text-[9px] text-neutral-400">({s/16}rem)</div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="flex-1">
                <h3 className="text-sm font-semibold text-neutral-400 mb-6 flex items-center gap-2">
                  <span className="text-primary-500">05</span> RADIUS & SHADOWS
                </h3>
                <div className="text-xs text-neutral-500 mb-4">Radius</div>
                <div className="flex gap-4 mb-8">
                  {[
                    { r: 4, name: 'small' },
                    { r: 8, name: 'default' },
                    { r: 12, name: 'medium' },
                    { r: 16, name: 'large' },
                    { r: 24, name: 'xl' },
                  ].map(item => (
                    <div key={item.r} className="text-center">
                      <div className="w-12 h-12 border border-neutral-200 mb-2 mx-auto" style={{ borderRadius: item.r }}></div>
                      <div className="text-[10px] font-medium">{item.r}px</div>
                      <div className="text-[9px] text-neutral-400">({item.name})</div>
                    </div>
                  ))}
                </div>

                <div className="text-xs text-neutral-500 mb-4">Shadows</div>
                <div className="flex gap-4">
                  <div className="flex-1 p-4 bg-white rounded-lg border border-neutral-100" style={{ boxShadow: 'var(--shadow-sm)' }}>
                    <div className="text-xs font-medium mb-1">Sm</div>
                    <div className="text-[9px] text-neutral-400">0 1px 2px rgba(0,0,0,0.05)</div>
                  </div>
                  <div className="flex-1 p-4 bg-white rounded-lg border border-neutral-100" style={{ boxShadow: 'var(--shadow-md)' }}>
                    <div className="text-xs font-medium mb-1">Md</div>
                    <div className="text-[9px] text-neutral-400">0 4px 12px rgba(0,0,0,0.08)</div>
                  </div>
                  <div className="flex-1 p-4 bg-white rounded-lg border border-neutral-100" style={{ boxShadow: 'var(--shadow-lg)' }}>
                    <div className="text-xs font-medium mb-1">Lg</div>
                    <div className="text-[9px] text-neutral-400">0 12px 32px rgba(0,0,0,0.12)</div>
                  </div>
                </div>
              </section>
            </div>

            {/* 07 BUTTONS */}
            <section>
              <h3 className="text-sm font-semibold text-neutral-400 mb-6 flex items-center gap-2">
                <span className="text-primary-500">07</span> BUTTONS
              </h3>
              
              <div className="grid grid-cols-4 gap-6">
                <div className="space-y-4">
                  <div className="text-xs font-medium text-neutral-500 mb-2">Primary</div>
                  <button className="w-full py-2 px-4 bg-primary-500 text-white rounded font-medium text-sm hover:bg-primary-400 transition-colors">Get Started</button>
                  <button className="w-full py-2 px-4 bg-primary-400 text-white rounded font-medium text-sm">Get Started</button>
                  <button className="w-full py-2 px-4 bg-neutral-200 text-neutral-400 rounded font-medium text-sm cursor-not-allowed">Disabled</button>
                </div>
                
                <div className="space-y-4">
                  <div className="text-xs font-medium text-neutral-500 mb-2">Secondary</div>
                  <button className="w-full py-2 px-4 border border-primary-500 text-primary-500 rounded font-medium text-sm hover:bg-primary-50 transition-colors">Explore</button>
                  <button className="w-full py-2 px-4 border border-primary-400 text-primary-400 rounded font-medium text-sm bg-primary-50">Explore</button>
                  <button className="w-full py-2 px-4 border border-neutral-200 text-neutral-400 rounded font-medium text-sm cursor-not-allowed">Explore</button>
                </div>
                
                <div className="space-y-4">
                  <div className="text-xs font-medium text-neutral-500 mb-2">Tertiary</div>
                  <button className="w-full py-2 px-4 text-neutral-700 hover:text-primary-500 hover:bg-neutral-50 rounded font-medium text-sm transition-colors">View More</button>
                  <button className="w-full py-2 px-4 text-primary-500 bg-neutral-50 rounded font-medium text-sm">View More</button>
                  <button className="w-full py-2 px-4 text-neutral-400 rounded font-medium text-sm cursor-not-allowed">View More</button>
                </div>

                <div className="space-y-4">
                  <div className="text-xs font-medium text-neutral-500 mb-2">Text</div>
                  <button className="w-full py-2 px-4 text-primary-500 font-medium text-sm hover:underline">Read More</button>
                  <button className="w-full py-2 px-4 text-primary-400 font-medium text-sm underline">Read More</button>
                  <button className="w-full py-2 px-4 text-neutral-400 font-medium text-sm cursor-not-allowed">Read More</button>
                </div>
              </div>
            </section>

            {/* 08 INPUTS & 09 BADGES & 10 STATUS & 11 PROGRESS */}
            <div className="grid grid-cols-2 gap-8">
              <section>
                <h3 className="text-sm font-semibold text-neutral-400 mb-6 flex items-center gap-2">
                  <span className="text-primary-500">08</span> INPUTS
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">Search Field</label>
                    <div className="relative">
                      <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input type="text" placeholder="Search news, topics..." className="w-full pl-9 pr-8 py-2 border border-neutral-200 rounded text-sm focus:outline-none focus:border-primary-500" />
                      <X className="w-4 h-4 text-neutral-400 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">Select / Dropdown</label>
                    <div className="relative">
                      <select className="w-full pl-3 pr-8 py-2 border border-neutral-200 rounded text-sm focus:outline-none focus:border-primary-500 appearance-none bg-white text-neutral-900">
                        <option>Choose category</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-neutral-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">Text Field</label>
                    <input type="email" placeholder="Your email address" className="w-full px-3 py-2 border border-primary-500 rounded text-sm focus:outline-none" />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">Focus State</label>
                    <div className="relative">
                      <input type="text" value="nepal" readOnly className="w-full px-3 py-2 border border-primary-500 rounded text-sm focus:outline-none" />
                      <X className="w-4 h-4 text-neutral-400 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" />
                    </div>
                  </div>
                </div>
              </section>

              <div className="space-y-8">
                <section>
                  <h3 className="text-sm font-semibold text-neutral-400 mb-6 flex items-center gap-2">
                    <span className="text-primary-500">09</span> BADGES / TAGS
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-primary-500 text-white text-xs font-medium rounded-full">World</span>
                    <span className="px-3 py-1 border border-primary-500 text-primary-500 text-xs font-medium rounded-full">Politics</span>
                    <span className="px-3 py-1 border border-primary-500 text-primary-500 text-xs font-medium rounded-full">Business</span>
                    <span className="px-3 py-1 border border-primary-500 text-primary-500 text-xs font-medium rounded-full">Tech</span>
                    <span className="px-3 py-1 border border-neutral-200 text-primary-500 text-xs font-medium rounded-full bg-neutral-50">Health</span>
                    <span className="px-3 py-1 border border-neutral-200 text-primary-500 text-xs font-medium rounded-full bg-neutral-50">Sports</span>
                    <span className="px-3 py-1 border border-neutral-200 text-primary-500 text-xs font-medium rounded-full bg-neutral-50">Entertainment</span>
                    <span className="px-3 py-1 border border-neutral-200 text-primary-500 text-xs font-medium rounded-full bg-neutral-50">Lifestyle</span>
                    <span className="px-3 py-1 border border-neutral-200 text-primary-500 text-xs font-medium rounded-full bg-neutral-50">Opinion</span>
                    <span className="px-3 py-1 border border-neutral-200 text-primary-500 text-xs font-medium rounded-full bg-neutral-50">Science</span>
                  </div>
                </section>

                <div className="flex gap-8">
                  <section className="flex-1">
                    <h3 className="text-sm font-semibold text-neutral-400 mb-4 flex items-center gap-2">
                      <span className="text-primary-500">10</span> STATUS
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-error"></div> Live
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-success" /> Completed
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Bookmark className="w-4 h-4 text-neutral-500" /> Saved
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-4 h-4 rounded-full border-2 border-neutral-200 border-t-primary-500 animate-spin"></div> Loading...
                      </div>
                      <div className="flex items-center gap-2 text-sm text-error">
                        <XCircle className="w-4 h-4" /> Error
                      </div>
                    </div>
                  </section>
                  
                  <section className="flex-1">
                    <h3 className="text-sm font-semibold text-neutral-400 mb-4 flex items-center gap-2">
                      <span className="text-primary-500">11</span> PROGRESS BAR
                    </h3>
                    <div>
                      <div className="h-2 w-full bg-neutral-200 rounded-full overflow-hidden mb-1">
                        <div className="h-full bg-primary-500 rounded-full" style={{ width: '68%' }}></div>
                      </div>
                      <div className="text-right text-[10px] text-neutral-500">68% complete</div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
            
            {/* 12 CARDS */}
            <section>
              <h3 className="text-sm font-semibold text-neutral-400 mb-6 flex items-center gap-2">
                <span className="text-primary-500">12</span> CARDS
              </h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-1 row-span-2">
                  <div className="bg-white rounded-xl overflow-hidden border border-neutral-200 shadow-sm">
                    <div className="h-48 bg-neutral-200 relative">
                      <span className="absolute bottom-3 left-3 px-2 py-1 bg-primary-500 text-white text-[10px] font-medium rounded uppercase">World</span>
                    </div>
                    <div className="p-4">
                      <h4 className="font-serif text-xl font-semibold leading-tight mb-2">Global Leaders Convene for Climate Summit 2025</h4>
                      <p className="text-sm text-neutral-600 mb-4 line-clamp-2">World leaders gathered in Geneva to discuss climate action and sustainable development...</p>
                      <div className="flex items-center justify-between text-xs text-neutral-400">
                        <span>2h ago • 8 min read</span>
                        <Bookmark className="w-4 h-4 cursor-pointer" />
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-center text-neutral-400 mt-2">Hero News Card</div>
                </div>

                <div className="flex flex-col justify-between gap-6">
                  <div className="flex gap-4 bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
                    <div className="w-24 bg-neutral-200 shrink-0"></div>
                    <div className="p-3 py-4 flex-1">
                      <div className="text-xs text-primary-500 font-medium mb-1">Technology</div>
                      <h4 className="font-semibold text-sm leading-tight mb-2">AI Tools Are Reshaping the Future of Work</h4>
                      <div className="flex items-center justify-between text-xs text-neutral-400">
                        <span>3h ago • 5 min read</span>
                        <Bookmark className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
                    <div className="w-24 bg-neutral-200 shrink-0"></div>
                    <div className="p-3 py-4 flex-1">
                      <div className="text-xs text-primary-500 font-medium mb-1">Business</div>
                      <h4 className="font-semibold text-sm leading-tight mb-2">Markets React to New Economic Policies</h4>
                      <div className="flex items-center justify-between text-xs text-neutral-400">
                        <span>4h ago • 6 min read</span>
                        <Bookmark className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-center text-neutral-400 -mt-4">Compact Story Card</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mt-6">
                <div>
                  <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-4 flex items-center gap-4">
                    <div className="w-12 h-16 bg-neutral-100 rounded flex items-center justify-center shrink-0">
                      <FileText className="w-6 h-6 text-neutral-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm mb-1">Climate Action Report 2025</h4>
                      <div className="text-xs text-neutral-400 flex justify-between items-center">
                        <span>PDF • 2.4 MB</span>
                        <Download className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
                    <div className="h-32 bg-neutral-200 relative flex items-center justify-center">
                      <div className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow">
                        <Play className="w-4 h-4 text-neutral-900 ml-1" />
                      </div>
                      <span className="absolute bottom-2 left-2 bg-neutral-900/70 text-white text-[10px] px-1.5 py-0.5 rounded">4:32</span>
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium text-sm mb-1">The Future of Clean Energy</h4>
                      <div className="text-xs text-neutral-400">Video • 4.2K views</div>
                    </div>
                  </div>
                  <div className="text-xs text-center text-neutral-400 mt-2">Media / Resource Card</div>
                </div>
              </div>
            </section>
            
          </div>

          {/* Column 2 */}
          <div className="md:col-span-6 space-y-12">
            
            {/* 06 ICONS */}
            <section>
              <h3 className="text-sm font-semibold text-neutral-400 mb-6 flex items-center gap-2">
                <span className="text-primary-500">06</span> ICONS
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-medium text-neutral-500 mb-3">Outline Icons</h4>
                  <div className="flex flex-wrap gap-4 text-neutral-700">
                    <Home className="w-6 h-6" /> <Search className="w-6 h-6" /> <Bell className="w-6 h-6" /> <Bookmark className="w-6 h-6" />
                    <User className="w-6 h-6" /> <Settings className="w-6 h-6" /> <Share2 className="w-6 h-6" /> <Heart className="w-6 h-6" />
                    <MessageSquare className="w-6 h-6" /> <ArrowLeft className="w-6 h-6" /> <ArrowRight className="w-6 h-6" /> <ExternalLink className="w-6 h-6" />
                    <Menu className="w-6 h-6" /> <Play className="w-6 h-6" /> <Pause className="w-6 h-6" /> <ChevronRight className="w-6 h-6" />
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xs font-medium text-neutral-500 mb-3">Filled Icons (Simulated)</h4>
                  <div className="flex flex-wrap gap-4 text-neutral-900">
                    <Home className="w-6 h-6 fill-current" /> <Search className="w-6 h-6 stroke-[3px]" /> <Bell className="w-6 h-6 fill-current" /> <Bookmark className="w-6 h-6 fill-current" />
                    <User className="w-6 h-6 fill-current" /> <Settings className="w-6 h-6 fill-current" /> <Share2 className="w-6 h-6 stroke-[3px]" /> <Heart className="w-6 h-6 fill-current" />
                    <MessageSquare className="w-6 h-6 fill-current" /> <ArrowLeft className="w-6 h-6 stroke-[3px]" /> <ArrowRight className="w-6 h-6 stroke-[3px]" /> <ExternalLink className="w-6 h-6 stroke-[3px]" />
                    <Menu className="w-6 h-6 stroke-[3px]" /> <Play className="w-6 h-6 fill-current" /> <Pause className="w-6 h-6 fill-current" /> <Clock className="w-6 h-6 fill-current" />
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-medium text-neutral-500 mb-3">Media Controls</h4>
                  <div className="flex flex-wrap gap-4 text-neutral-900 items-center">
                    <ChevronLeft className="w-5 h-5" /> <Pause className="w-5 h-5 fill-current" /> <ChevronRight className="w-5 h-5" />
                    <div className="w-4" /> {/* Spacer */}
                    <Play className="w-3 h-3 fill-current" /> <Play className="w-4 h-4 fill-current" /> <Play className="w-5 h-5 fill-current" /> <Play className="w-6 h-6 fill-current" />
                  </div>
                </div>
              </div>
            </section>

            {/* 14 DROPDOWNS / MENUS */}
            <section>
              <h3 className="text-sm font-semibold text-neutral-400 mb-6 flex items-center gap-2">
                <span className="text-primary-500">14</span> DROPDOWNS / MENUS
              </h3>
              
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-medium text-neutral-500 mb-2">Category</h4>
                    <div className="w-48 bg-white border border-neutral-200 rounded shadow-sm">
                      <div className="px-3 py-2 flex justify-between items-center text-sm border-b border-neutral-100">
                        <span>World</span>
                        <ChevronDown className="w-4 h-4 text-neutral-400" />
                      </div>
                      <div className="py-1">
                        <div className="px-3 py-1.5 text-sm text-primary-500 bg-primary-50 flex justify-between items-center">
                          World <CheckCircle className="w-3.5 h-3.5" />
                        </div>
                        <div className="px-3 py-1.5 text-sm hover:bg-neutral-50 cursor-pointer">Business</div>
                        <div className="px-3 py-1.5 text-sm hover:bg-neutral-50 cursor-pointer">Tech</div>
                        <div className="px-3 py-1.5 text-sm hover:bg-neutral-50 cursor-pointer">Health</div>
                        <div className="px-3 py-1.5 text-sm hover:bg-neutral-50 cursor-pointer">Sports</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-medium text-neutral-500 mb-2">Context Menu</h4>
                    <div className="w-48 bg-white border border-neutral-200 rounded shadow-sm py-1">
                      <div className="px-3 py-2 text-sm hover:bg-neutral-50 cursor-pointer flex items-center gap-2">
                        <Bookmark className="w-4 h-4" /> Save Article
                      </div>
                      <div className="px-3 py-2 text-sm hover:bg-neutral-50 cursor-pointer flex items-center gap-2">
                        <Share2 className="w-4 h-4" /> Share
                      </div>
                      <div className="px-3 py-2 text-sm hover:bg-neutral-50 cursor-pointer flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" /> Report
                      </div>
                      <div className="border-t border-neutral-100 my-1"></div>
                      <div className="px-3 py-2 text-sm hover:bg-neutral-50 cursor-pointer flex items-center gap-2 text-error">
                        <XCircle className="w-4 h-4" /> Not Interested
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-medium text-neutral-500 mb-2">User Menu</h4>
                  <div className="w-56 bg-white border border-neutral-200 rounded shadow-sm">
                    <div className="p-3 border-b border-neutral-100 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-neutral-200 flex-shrink-0"></div>
                      <div>
                        <div className="text-sm font-medium">Prasun</div>
                        <div className="text-xs text-neutral-500">prasun@example.com</div>
                      </div>
                    </div>
                    <div className="py-1">
                      <div className="px-3 py-2 text-sm hover:bg-neutral-50 cursor-pointer flex items-center gap-2">
                        <User className="w-4 h-4" /> Profile
                      </div>
                      <div className="px-3 py-2 text-sm hover:bg-neutral-50 cursor-pointer flex items-center gap-2">
                        <Settings className="w-4 h-4" /> Settings
                      </div>
                      <div className="px-3 py-2 text-sm hover:bg-neutral-50 cursor-pointer flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Bell className="w-4 h-4" /> Notifications
                        </div>
                        <div className="w-2 h-2 rounded-full bg-error"></div>
                      </div>
                      <div className="px-3 py-2 text-sm hover:bg-neutral-50 cursor-pointer flex items-center gap-2">
                        <Info className="w-4 h-4" /> Help & Support
                      </div>
                      <div className="border-t border-neutral-100 my-1"></div>
                      <div className="px-3 py-2 text-sm hover:bg-neutral-50 cursor-pointer flex items-center gap-2 text-error">
                        <LogOut className="w-4 h-4" /> Log Out
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            {/* 13 NAVIGATION */}
            <section>
              <h3 className="text-sm font-semibold text-neutral-400 mb-6 flex items-center gap-2">
                <span className="text-primary-500">13</span> NAVIGATION
              </h3>
              
              <div className="space-y-6">
                <div className="bg-white border border-neutral-200 rounded shadow-sm p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-primary-500 text-white rounded flex items-center justify-center font-bold text-xs">V</div>
                    <span className="font-serif font-semibold text-sm">Serene<br/>Lavoisier</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-4 text-sm font-medium">
                    <span className="text-primary-500 border-b-2 border-primary-500 pb-1 -mb-1">Home</span>
                    <span className="text-neutral-500 hover:text-neutral-900 cursor-pointer">World</span>
                    <span className="text-neutral-500 hover:text-neutral-900 cursor-pointer">Business</span>
                    <span className="text-neutral-500 hover:text-neutral-900 cursor-pointer">Tech</span>
                    <span className="text-neutral-500 hover:text-neutral-900 cursor-pointer">Health</span>
                    <span className="text-neutral-500 hover:text-neutral-900 cursor-pointer">Sports</span>
                  </div>
                  <div className="flex gap-2">
                    <Search className="w-5 h-5 text-neutral-500" />
                    <User className="w-5 h-5 text-neutral-500" />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-neutral-500">
                  <span className="hover:text-primary-500 cursor-pointer">Home</span>
                  <ChevronRight className="w-3 h-3" />
                  <span className="hover:text-primary-500 cursor-pointer">World</span>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-neutral-900">Article</span>
                </div>

                <div>
                  <div className="text-xs font-medium text-neutral-500 mb-2">Pagination</div>
                  <div className="flex items-center gap-1">
                    <button className="w-8 h-8 rounded border border-neutral-200 flex items-center justify-center text-neutral-400"><ChevronLeft className="w-4 h-4" /></button>
                    <button className="w-8 h-8 rounded bg-primary-500 text-white font-medium text-sm flex items-center justify-center">1</button>
                    <button className="w-8 h-8 rounded hover:bg-neutral-50 text-neutral-700 font-medium text-sm flex items-center justify-center">2</button>
                    <button className="w-8 h-8 rounded hover:bg-neutral-50 text-neutral-700 font-medium text-sm flex items-center justify-center">3</button>
                    <button className="w-8 h-8 rounded hover:bg-neutral-50 text-neutral-700 font-medium text-sm flex items-center justify-center">4</button>
                    <button className="w-8 h-8 rounded hover:bg-neutral-50 text-neutral-700 font-medium text-sm flex items-center justify-center">5</button>
                    <span className="w-8 h-8 flex items-center justify-center text-neutral-400">...</span>
                    <button className="w-8 h-8 rounded hover:bg-neutral-50 text-neutral-700 font-medium text-sm flex items-center justify-center">12</button>
                    <button className="w-8 h-8 rounded border border-neutral-200 flex items-center justify-center text-neutral-700 hover:bg-neutral-50"><ChevronRight className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>

        {/* Third Row */}
        <div className="p-8 border-t border-neutral-200 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="space-y-12">
            {/* 15 TOGGLES & 16 TABS & 17 CHIPS */}
            <section>
              <h3 className="text-sm font-semibold text-neutral-400 mb-6 flex items-center gap-2">
                <span className="text-primary-500">15</span> TOGGLES / ALERTS
              </h3>
              <div className="space-y-3">
                <div className="p-3 border border-neutral-200 rounded flex gap-3 shadow-sm bg-white">
                  <div className="w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-white text-xs">!</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-medium">New article available</h4>
                      <X className="w-4 h-4 text-neutral-400" />
                    </div>
                    <p className="text-xs text-neutral-500">Climate summit 2025 is now live.</p>
                    <div className="text-[10px] text-neutral-400 mt-1">2m ago</div>
                  </div>
                </div>

                <div className="p-3 border border-neutral-200 rounded flex gap-3 shadow-sm bg-white">
                  <div className="w-6 h-6 rounded-full bg-info flex items-center justify-center shrink-0 mt-0.5">
                    <Info className="w-3 h-3 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-medium">Comment received</h4>
                      <X className="w-4 h-4 text-neutral-400" />
                    </div>
                    <p className="text-xs text-neutral-500">Your comment got a reply.</p>
                    <div className="text-[10px] text-neutral-400 mt-1">12m ago</div>
                  </div>
                </div>

                <div className="p-3 border border-neutral-200 rounded flex gap-3 shadow-sm bg-white">
                  <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-medium">Article saved</h4>
                      <X className="w-4 h-4 text-neutral-400" />
                    </div>
                    <p className="text-xs text-neutral-500">The article has been saved to your library.</p>
                    <div className="text-[10px] text-neutral-400 mt-1">1h ago</div>
                  </div>
                </div>

                <div className="p-3 border border-neutral-200 rounded flex gap-3 shadow-sm bg-white">
                  <div className="w-6 h-6 rounded-full bg-error flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-medium">Failed to load</h4>
                      <X className="w-4 h-4 text-neutral-400" />
                    </div>
                    <p className="text-xs text-neutral-500">Please check your internet connection.</p>
                    <div className="text-[10px] text-neutral-400 mt-1">2h ago</div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-12">
            <section>
              <h3 className="text-sm font-semibold text-neutral-400 mb-6 flex items-center gap-2">
                <span className="text-primary-500">16</span> TABS & CHIPS
              </h3>
              
              <div className="space-y-6">
                <div className="flex border-b border-neutral-200">
                  <button className="px-4 py-2 border-b-2 border-primary-500 text-primary-500 font-medium text-sm">Top News</button>
                  <button className="px-4 py-2 text-neutral-500 font-medium text-sm hover:text-neutral-700">World</button>
                  <button className="px-4 py-2 text-neutral-500 font-medium text-sm hover:text-neutral-700">Business</button>
                  <button className="px-4 py-2 text-neutral-500 font-medium text-sm hover:text-neutral-700">Tech</button>
                </div>

                <div className="flex gap-2 bg-neutral-100 p-1 rounded-full">
                  <button className="flex-1 py-1.5 px-3 bg-white shadow-sm rounded-full text-xs font-medium text-neutral-900">Latest</button>
                  <button className="flex-1 py-1.5 px-3 rounded-full text-xs font-medium text-neutral-500 hover:text-neutral-700">Popular</button>
                  <button className="flex-1 py-1.5 px-3 rounded-full text-xs font-medium text-neutral-500 hover:text-neutral-700">Trending</button>
                </div>

                <div>
                  <div className="text-xs font-medium text-neutral-500 mb-2">Chips</div>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-4 py-1.5 rounded-full border border-primary-500 text-primary-500 text-xs font-medium bg-primary-50">All</button>
                    <button className="px-4 py-1.5 rounded-full border border-neutral-200 text-neutral-600 text-xs hover:bg-neutral-50">Politics</button>
                    <button className="px-4 py-1.5 rounded-full border border-neutral-200 text-neutral-600 text-xs hover:bg-neutral-50">Business</button>
                    <button className="px-4 py-1.5 rounded-full border border-neutral-200 text-neutral-600 text-xs hover:bg-neutral-50">Tech</button>
                    <button className="w-7 h-7 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-50">+</button>
                  </div>
                </div>
              </div>
            </section>
            
            <section>
              <h3 className="text-sm font-semibold text-neutral-400 mb-6 flex items-center gap-2">
                <span className="text-primary-500">18</span> TOOLTIP
              </h3>
              <div className="flex gap-4 items-center">
                <Info className="w-5 h-5 text-neutral-400" />
                <div className="bg-neutral-800 text-white text-xs py-1.5 px-3 rounded relative">
                  This is a tooltip message.
                  <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-neutral-800 rotate-45"></div>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-12">
            <section>
              <h3 className="text-sm font-semibold text-neutral-400 mb-6 flex items-center gap-2">
                <span className="text-primary-500">19</span> MODAL / DIALOG
              </h3>
              <div className="bg-white border border-neutral-200 rounded-lg shadow-lg p-5">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-sm">Save this article?</h4>
                  <X className="w-4 h-4 text-neutral-400 cursor-pointer" />
                </div>
                <p className="text-xs text-neutral-500 mb-4">You can find it in your saved items later.</p>
                <div className="flex gap-2 justify-end">
                  <button className="px-4 py-1.5 border border-neutral-200 text-neutral-600 rounded text-xs font-medium">Cancel</button>
                  <button className="px-4 py-1.5 bg-primary-500 text-white rounded text-xs font-medium">Save</button>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-sm font-semibold text-neutral-400 mb-6 flex items-center gap-2">
                <span className="text-primary-500">20</span> EMPTY / LOADING / ERROR
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-neutral-200 border-dashed rounded p-4 flex flex-col items-center justify-center text-center">
                  <ImageIcon className="w-6 h-6 text-neutral-300 mb-2" />
                  <div className="text-xs font-medium">No results found</div>
                  <div className="text-[10px] text-neutral-400">Try a different search.</div>
                </div>
                
                <div className="border border-neutral-200 rounded p-4 flex flex-col items-center justify-center text-center">
                  <div className="w-6 h-6 border-2 border-neutral-200 border-t-primary-500 rounded-full animate-spin mb-2"></div>
                  <div className="text-xs font-medium">Loading news...</div>
                  <div className="text-[10px] text-neutral-400">Please wait a moment.</div>
                </div>

                <div className="border border-neutral-200 rounded p-4 flex flex-col items-center justify-center text-center col-span-2">
                  <AlertCircle className="w-6 h-6 text-error mb-2" />
                  <div className="text-xs font-medium">Something went wrong</div>
                  <div className="text-[10px] text-neutral-400 mb-2">We couldn&apos;t load the content.</div>
                  <button className="text-xs text-primary-500 font-medium">Try again</button>
                </div>
              </div>
            </section>
          </div>
        </div>


        {/* Fourth Row - Mobile Preview */}
        <div className="p-8 border-t border-neutral-200">
          <section>
            <h3 className="text-sm font-semibold text-neutral-400 mb-6 flex items-center gap-2">
              <span className="text-primary-500">21</span> MOBILE APP PREVIEW
            </h3>
            <div className="flex gap-8 overflow-x-auto pb-4">
              
              {/* Screen 1: Splash / Loading */}
              <div className="w-[320px] h-[640px] shrink-0 border border-neutral-200 rounded-[2rem] bg-white shadow-lg overflow-hidden flex flex-col items-center justify-center relative p-6">
                <div className="w-16 h-16 bg-primary-500 text-white rounded-xl flex items-center justify-center font-bold text-3xl mb-4">V</div>
                <h2 className="text-2xl font-serif font-semibold text-neutral-900 mb-1">Serene Lavoisier</h2>
                <p className="text-[10px] text-neutral-500">Real News. Deeper Perspectives.</p>
                
                <div className="absolute bottom-8 w-6 h-6 border-2 border-neutral-200 border-t-primary-500 rounded-full animate-spin"></div>
              </div>
              
              {/* Screen 2: Home */}
              <div className="w-[320px] h-[640px] shrink-0 border border-neutral-200 rounded-[2rem] bg-neutral-100 shadow-lg overflow-hidden flex flex-col relative">
                {/* Header */}
                <div className="bg-white p-4 pt-6 flex justify-between items-center shadow-sm z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-primary-500 text-white rounded flex items-center justify-center font-bold text-xs">V</div>
                    <span className="font-serif font-semibold text-sm">Serene</span>
                  </div>
                  <div className="flex gap-3">
                    <Search className="w-5 h-5 text-neutral-600" />
                    <Bell className="w-5 h-5 text-neutral-600" />
                  </div>
                </div>
                {/* Tabs */}
                <div className="bg-white px-4 flex gap-4 border-b border-neutral-200 overflow-x-hidden">
                  <div className="py-2 border-b-2 border-primary-500 text-primary-500 font-medium text-xs">Top News</div>
                  <div className="py-2 text-neutral-500 text-xs">World</div>
                  <div className="py-2 text-neutral-500 text-xs">Business</div>
                  <div className="py-2 text-neutral-500 text-xs">Tech</div>
                </div>
                {/* Content */}
                <div className="p-4 flex-1 overflow-y-auto space-y-4 pb-20">
                  <div className="bg-white rounded-xl overflow-hidden border border-neutral-200">
                    <div className="h-40 bg-neutral-200 relative">
                      <span className="absolute bottom-2 left-2 bg-primary-500 text-white text-[9px] px-1.5 py-0.5 rounded font-medium">World</span>
                    </div>
                    <div className="p-3">
                      <h4 className="font-serif font-semibold text-sm leading-tight mb-2">Global Leaders Convene for Climate Summit 2025</h4>
                      <p className="text-xs text-neutral-500 line-clamp-2 mb-3">World leaders gathered in Geneva to discuss climate action...</p>
                      <div className="flex justify-between items-center text-[10px] text-neutral-400">
                        <span>2h ago • 8 min read</span>
                        <Bookmark className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 bg-white rounded-xl border border-neutral-200 p-2">
                    <div className="w-20 bg-neutral-200 rounded shrink-0"></div>
                    <div className="flex-1 py-1">
                      <div className="text-[10px] text-primary-500 font-medium mb-1">Technology</div>
                      <h4 className="font-semibold text-xs leading-tight mb-2">AI Tools Are Reshaping the Future of Work</h4>
                      <div className="text-[9px] text-neutral-400">3h ago</div>
                    </div>
                  </div>
                </div>
                {/* Bottom Nav */}
                <div className="absolute bottom-0 w-full bg-white border-t border-neutral-200 py-3 px-6 flex justify-between items-center z-10">
                  <div className="flex flex-col items-center text-primary-500"><Home className="w-5 h-5 fill-current" /> <span className="text-[9px] mt-1 font-medium">Home</span></div>
                  <div className="flex flex-col items-center text-neutral-400"><Search className="w-5 h-5" /> <span className="text-[9px] mt-1 font-medium">Explore</span></div>
                  <div className="flex flex-col items-center text-neutral-400"><Bookmark className="w-5 h-5" /> <span className="text-[9px] mt-1 font-medium">Bookmarks</span></div>
                  <div className="flex flex-col items-center text-neutral-400"><User className="w-5 h-5" /> <span className="text-[9px] mt-1 font-medium">Profile</span></div>
                </div>
              </div>

              {/* Screen 3: Article */}
              <div className="w-[320px] h-[640px] shrink-0 border border-neutral-200 rounded-[2rem] bg-white shadow-lg overflow-hidden flex flex-col relative">
                {/* Header */}
                <div className="p-4 pt-6 flex justify-between items-center">
                  <ArrowLeft className="w-5 h-5 text-neutral-900" />
                  <div className="flex gap-3">
                    <Bookmark className="w-5 h-5 text-neutral-900" />
                    <Share2 className="w-5 h-5 text-neutral-900" />
                    <Menu className="w-5 h-5 text-neutral-900" />
                  </div>
                </div>
                {/* Content */}
                <div className="flex-1 overflow-y-auto">
                  <div className="h-48 bg-neutral-200 w-full"></div>
                  <div className="p-4">
                    <div className="text-xs text-primary-500 font-medium mb-2">Environment</div>
                    <h2 className="text-xl font-serif font-semibold leading-tight mb-4">The Power of Renewable Energy in a Greener Future</h2>
                    <div className="flex items-center gap-2 mb-4 pb-4 border-b border-neutral-100">
                      <div className="w-8 h-8 rounded-full bg-neutral-200"></div>
                      <div>
                        <div className="text-xs font-medium">By Sarah Williams</div>
                        <div className="text-[10px] text-neutral-400">May 12, 2025 • 5 min read</div>
                      </div>
                    </div>
                    <div className="text-sm text-neutral-700 space-y-3 font-serif leading-relaxed">
                      <p>As the world faces unprecedented climate challenges, renewable energy sources have become more critical than ever. Solar, wind, and hydroelectric power are paving the way...</p>
                      <p>Recent innovations in battery storage technology are addressing the intermittency issues that have historically plagued green energy grids.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Screen 4: Saved / Profile */}
              <div className="w-[320px] h-[640px] shrink-0 border border-neutral-200 rounded-[2rem] bg-neutral-50 shadow-lg overflow-hidden flex flex-col relative">
                {/* Header */}
                <div className="bg-white p-4 pt-6 flex justify-between items-center shadow-sm">
                  <h2 className="font-semibold text-lg">Saved</h2>
                  <Search className="w-5 h-5 text-neutral-900" />
                </div>
                {/* Content */}
                <div className="p-4 flex-1 overflow-y-auto space-y-4">
                  <div className="bg-white p-3 rounded-lg border border-neutral-200 flex gap-3 items-center">
                    <div className="w-10 h-12 bg-neutral-100 rounded flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-neutral-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-xs mb-1">Climate Action Report 2025</h4>
                      <div className="text-[10px] text-neutral-400">PDF • 2.4 MB</div>
                    </div>
                    <Download className="w-4 h-4 text-neutral-400" />
                  </div>
                  
                  <div className="bg-white p-3 rounded-lg border border-neutral-200 flex gap-3 items-center">
                    <div className="w-16 h-12 bg-neutral-200 rounded shrink-0 relative flex items-center justify-center">
                      <Play className="w-4 h-4 text-white fill-current" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-xs mb-1">The Future of Clean Energy</h4>
                      <div className="text-[10px] text-neutral-400">Video • 4.3K views</div>
                    </div>
                    <Settings className="w-4 h-4 text-neutral-400 rotate-90" />
                  </div>
                </div>
                {/* Bottom Nav */}
                <div className="absolute bottom-0 w-full bg-white border-t border-neutral-200 py-3 px-6 flex justify-between items-center z-10">
                  <div className="flex flex-col items-center text-neutral-400"><Home className="w-5 h-5" /> <span className="text-[9px] mt-1 font-medium">Home</span></div>
                  <div className="flex flex-col items-center text-neutral-400"><Search className="w-5 h-5" /> <span className="text-[9px] mt-1 font-medium">Explore</span></div>
                  <div className="flex flex-col items-center text-primary-500"><Bookmark className="w-5 h-5 fill-current" /> <span className="text-[9px] mt-1 font-medium">Bookmarks</span></div>
                  <div className="flex flex-col items-center text-neutral-400"><User className="w-5 h-5" /> <span className="text-[9px] mt-1 font-medium">Profile</span></div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

