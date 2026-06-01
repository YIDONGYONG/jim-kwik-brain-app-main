import express from "express";
import path from "path";
import fs from "fs";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// Read Firebase config
const firebaseConfigPath = path.join(process.cwd(), "firebase-applet-config.json");
let db: any = null;
if (fs.existsSync(firebaseConfigPath)) {
  const firebaseConfig = JSON.parse(fs.readFileSync(firebaseConfigPath, "utf-8"));
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
}

async function startServer() {
  const app = express();
  const PORT = 3000;
  
  app.use(express.json());

  // API routes
  app.post("/api/results", async (req, res) => {
    try {
      const { browserId, brainType, scores } = req.body;
      
      const newEntry = { 
        browserId, 
        brainType, 
        scores, 
        createdAt: serverTimestamp() 
      };
      
      if (db) {
        await addDoc(collection(db, "results"), newEntry);
        console.log("Telemetry saved to Firestore.");
      } else {
        console.log("[Simulation] Telemetry saved:", newEntry);
      }
      
      res.json({ status: "ok", message: "Data collected anonymously" });
    } catch (error) {
      console.error("Error saving telemetry:", error);
      res.status(500).json({ error: "Failed to collect telemetry" });
    }
  });

  const distPath = path.join(process.cwd(), 'dist');
  const isProduction = process.env.NODE_ENV === "production" || fs.existsSync(path.join(distPath, 'index.html'));

  // Vite middleware for development
  if (!isProduction) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(distPath, { index: false }));
    app.get('*', async (req, res) => {
      try {
        let html = await fs.promises.readFile(path.join(distPath, 'index.html'), 'utf-8');
        res.send(html);
      } catch (e) {
        res.sendFile(path.join(distPath, 'index.html'));
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
