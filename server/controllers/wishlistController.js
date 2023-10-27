// import express from 'express';
// const router = express.Router();
// import User from '../models/User.js';

// // Favori ürün eklemek için POST isteği
// router.post('/products/:id/:id', async (req, res) => {
//   try {
//     const { user_id, product_id } = req.params;

//     // Kullanıcıyı bulun
//     const user = await User.findById(user_id);

//     if (!user) {
//       return res.status(404).json({ message: 'Kullanici bulunamadi' });
//     }

//     // Ürünü kullanıcının userwishlist dizisine ekleyin
//     user.userwishlist.push(product_id);

//     // Kullanıcıyı kaydedin
//     await user.save();

//     // Başarılı yanıt gönderin
//     console.log(res.status(200).json({ message: 'Ürün favorilere eklendi' }));
//     res.status(200).json({ message: 'Ürün favorilere eklendi' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Sunucu hatasi' });
//   }
// });

// // Favori ürünü kaldırmak için DELETE isteği
// router.delete('/products/:id/:id', async (req, res) => {
//   try {
//     const { user_id, product_id } = req.params;

//     // Kullanıcıyı bulun
//     const user = await User.findById(user_id);

//     if (!user) {
//       return res.status(404).json({ message: 'Kullanici bulunamadi' });
//     }

//     // Ürünü kullanıcının userwishlist dizisinden kaldırın
//     user.userwishlist = user.userwishlist.filter(id => id !== product_id);

//     // Kullanıcıyı kaydedin
//     await user.save();

//     // Başarılı yanıt gönderin
//     res.status(200).json({ message: 'Ürün favorilerden kaldırıldi' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Sunucu hatasi' });
//   }
// });


// export default router;



