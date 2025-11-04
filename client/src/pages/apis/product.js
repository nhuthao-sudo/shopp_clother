// export default function handler(req, res) {
//   if (typeof window === "undefined") {
//     // Server-side không có localStorage
//     return res.status(200).json([]);
//   }

//   const products = JSON.parse(localStorage.getItem("products") || "[]");

//   switch (req.method) {
//     case "GET":
//       return res.status(200).json(products);

//     case "POST": {
//       const newProduct = { id: Date.now().toString(), ...req.body };
//       const updated = [...products, newProduct];
//       localStorage.setItem("products", JSON.stringify(updated));
//       return res.status(201).json(newProduct);
//     }

//     case "PUT": {
//       const { id } = req.query;
//       const index = products.findIndex((p) => p.id === id);
//       if (index === -1) return res.status(404).json({ message: "Not found" });
//       products[index] = { ...products[index], ...req.body };
//       localStorage.setItem("products", JSON.stringify(products));
//       return res.status(200).json(products[index]);
//     }

//     case "DELETE": {
//       const { id } = req.query;
//       const filtered = products.filter((p) => p.id !== id);
//       localStorage.setItem("products", JSON.stringify(filtered));
//       return res.status(200).json({ success: true });
//     }

//     default:
//       return res.status(405).end();
//   }
// }
