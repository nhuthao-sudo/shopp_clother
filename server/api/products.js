const productsData = require('../data/products.json');

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const { category, featured } = req.query;
        let filteredProducts = productsData.products;

        if (category) {
          filteredProducts = filteredProducts.filter(
            product => product.category === category
          );
        }

        if (featured === 'true') {
          filteredProducts = filteredProducts.filter(
            product => product.featured
          );
        }

        res.status(200).json({
          success: true,
          data: filteredProducts,
          total: filteredProducts.length
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: 'Lỗi server'
        });
      }
      break;

    default:
      res.status(405).json({
        success: false,
        message: 'Method không được hỗ trợ'
      });
      break;
  }
}