// export const productApi = {
//   async getAll() {
//     const res = await fetch("/api/products");
//     return res.json();
//   },
//   async add(product) {
//     const res = await fetch("/api/products", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(product),
//     });
//     return res.json();
//   },
//   async update(id, data) {
//     const res = await fetch(`/api/products?id=${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     });
//     return res.json();
//   },
//   async remove(id) {
//     const res = await fetch(`/api/products?id=${id}`, { method: "DELETE" });
//     return res.json();
//   },
// };
