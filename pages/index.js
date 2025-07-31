"use client";

import { useState } from "react"; import { Input } from "@/components/ui/input"; import { Button } from "@/components/ui/button"; import { Card, CardContent } from "@/components/ui/card"; import { Loader2, Search, FileDown, Sparkles } from "lucide-react"; import { motion } from "framer-motion";

export default function AppPage() { const [query, setQuery] = useState(""); const [loading, setLoading] = useState(false); const [results, setResults] = useState<any>(null);

const handleSearch = async () => { if (!query.trim()) return; setLoading(true); setResults(null);

try {
  // Placeholder fetch — replace with your API route later
  const res = await fetch("/api/search?q=" + encodeURIComponent(query));
  const data = await res.json();
  setResults(data);
} catch (e) {
  setResults({ error: "Something went wrong. Please try again." });
} finally {
  setLoading(false);
}

};

return ( <main className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 text-white p-4 flex flex-col items-center"> <motion.div className="text-center mt-16" initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} > <h1 className="text-4xl md:text-5xl font-bold mb-4"> <Sparkles className="inline w-8 h-8 text-yellow-400" /> Data Whisperer </h1> <p className="text-gray-300 max-w-xl mx-auto text-lg"> Ask anything in plain English. Get structured data scraped from the web or smart suggestions — all in one click. </p> </motion.div>

<motion.div
    className="w-full max-w-2xl mt-10 flex gap-2"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4, duration: 0.5 }}
  >
    <Input
      placeholder="e.g. Indian startups founded after 2020"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="text-black px-4 py-3 rounded-xl text-base"
    />
    <Button onClick={handleSearch} className="rounded-xl px-5">
      {loading ? <Loader2 className="animate-spin" /> : <Search />}
    </Button>
  </motion.div>

  {results && (
    <motion.div
      className="w-full max-w-3xl mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl">
        <CardContent className="p-6 text-left">
          {results.error ? (
            <p className="text-red-400">{results.error}</p>
          ) : (
            <>
              <h2 className="text-xl font-semibold mb-2 text-yellow-300">Results:</h2>
              <pre className="whitespace-pre-wrap text-sm text-gray-200">
                {JSON.stringify(results, null, 2)}
              </pre>
              <div className="flex gap-4 mt-4">
                <Button variant="outline" className="rounded-lg">
                  <FileDown className="mr-2 h-4 w-4" /> Download JSON
                </Button>
                <Button variant="outline" className="rounded-lg">
                  <FileDown className="mr-2 h-4 w-4" /> Download CSV
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )}
</main>

); }

