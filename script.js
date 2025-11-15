const fs = require('fs');
const path = 'pages/AdminDriversPage.tsx';
let text = fs.readFileSync(path, 'utf8');
const startMarker = '          <section className="space-y-10">';
const startIndex = text.indexOf(startMarker);
if (startIndex === -1) {
  throw new Error('start marker not found');
}
const endMarker = '          </section>';
const sectionStart = startIndex;
const sectionEndMarkerIndex = text.indexOf(endMarker, startIndex);
if (sectionEndMarkerIndex === -1) {
  throw new Error('end marker not found');
}
const sectionEnd = sectionEndMarkerIndex + endMarker.length;
const lines = [
  '          <section className="space-y-10">',
  '            <div className="relative max-w-2xl">',
  '              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">',
  '                <Search size={16} />',
  '              </span>',
  '              <input',
  '                type="text"',
  '                value={query}',
  '                onChange={(event) => setQuery(event.target.value)}',
  '                placeholder="Search drivers by name, email or ID..."',
  '                className="w-full rounded-2xl border border-white/10 bg-black/40 px-10 py-3 text-white placeholder-gray-500 focus:border-amber-400 focus:outline-none"',
  '              />',
  '            </div>',
  '            {filteredDrivers.length === 0 ? (',
  '              <div className="rounded-2xl border border-white/10 bg-black/40 p-6 text-center text-gray-400">',
  '                No drivers match your search. Try a different name or ID.',
  '              </div>',
  '            ) : (',
  '              <>',
  '                {filteredDrivers.map((driver) => (',
  '                  <article',
  '                    key={driver.id}',
  '                    className="space-y-6 rounded-3xl border border-white/10 bg-black/60 p-6 shadow-lg shadow-black/60"',
  '                  >',
  '                    <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">',
  '                      <div>',
  '                        <p className="text-xs uppercase tracking-wider text-amber-300/70">',
  '                          Driver ID {driver.id.toUpperCase()}',
  '                        </p>',
  '                        <h2 className="text-2xl font-bold text-white">{driver.name}</h2>',
  '                        <p className="text-sm text-gray-400">{driver.email}</p>',
  '                      </div>',
  '                      <div className="text-sm text-gray-300">',
  '                        <p>Phone: {driver.phone}</p>',
  '                        <p>PCO Expiry: {driver.pcoExpiry}</p>',
  '                      </div>',
  '                    </header>',
  '                    <nav className="flex flex-nowrap items-center gap-2 overflow-x-auto pb-2">',
  '                      {tabs.map((tab) => (',
  '                        <button',
  '                          key={tab}',
  '                          type="button"',
  '                          onClick={() => handleTabChange(driver.id, tab)}',
  '                          className={`relative px-4 py-2 text-sm font-semibold rounded-full transition-colors whitespace-nowrap ${',
  '                            getActiveTab(driver.id) === tab',
  '                              ? "bg-amber-400 text-black shadow-md shadow-amber-400/30"',
  '                              : "bg-gray-800/40 text-amber-300 hover:bg-gray-700/40"',
  '                          }`}',
  '                        >',
  '                          {tab}',
  '                          {tab === "Jobs" && driver.upcomingJobs.length > 0 && (',
  '                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[11px] font-bold text-white">',
  '                              {driver.upcomingJobs.length}',
  '                            </span>',
  '                          )}',
  '                        </button>',
  '                      ))}',
  '                    </nav>',
  '                    <div>{renderTabContent(driver)}</div>',
  '                  </article>',
  '                ))}',
  '              </>',
  '            )}',
  '          </section>'
];
const newSection = lines.join('\r\n');
text = text.slice(0, sectionStart) + newSection + text.slice(sectionEnd);
fs.writeFileSync(path, text, 'utf8');
