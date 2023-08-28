// NOTE: Added after the course, it needs to be deactivated for easy following of the course

// async function handleRevalidate(req, res) {
//   console.log("/api/revalidate received:", req.body);
//   const event = req.body;
//   if (event.model === "product") {
//     const id = event.entry.id;
//     await Promise.all([
//       await res.revalidate("/"),
//       await res.revalidate(`/products/${id}`),
//     ]);
//     console.log(`revalidated product with the id ${id}`);
//   }
//   res.status(204).end();
// }

// export default handleRevalidate;
