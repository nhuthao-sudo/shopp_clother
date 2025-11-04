import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Card,
  CardContent,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Chip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';

export default function AdminProducts({ products, refresh, onNavigate }) {
  const [form, setForm] = useState({
    name: '',
    price: 0,
    description: '',
    image: '',
    category: 'ao-thun',
    stock: 0,
    originalPrice: 0,
    discount: 0,
    rating: 0,
    sizes: ['M'],
    colors: ['Đen']
  });
  const [editingId, setEditingId] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  const categories = [
    { value: 'ao-thun', label: 'Áo Thun' },
    { value: 'ao-polo', label: 'Áo Polo' },
    { value: 'ao-khoac', label: 'Áo Khoác' },
    { value: 'quan-jean', label: 'Quần Jean' },
    { value: 'quan-short', label: 'Quần Short' },
    { value: 'vay-dam', label: 'Váy Đầm' },
  ];

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Mock update - replace with actual API
        showMessage('success', 'Cập nhật sản phẩm thành công!');
        setEditingId(null);
      } else {
        // Mock create - replace with actual API
        showMessage('success', 'Thêm sản phẩm thành công!');
      }
      
      // Reset form
      setForm({
        name: '',
        price: 0,
        description: '',
        image: '',
        category: 'ao-thun',
        stock: 0,
        originalPrice: 0,
        discount: 0,
        rating: 0,
        sizes: ['M'],
        colors: ['Đen']
      });
      
      refresh();
      
      // Uncomment for actual API calls:
      // if(editingId){
      //   await axios.put('http://localhost:5000/api/products/' + editingId, form);
      //   setEditingId(null);
      // } else {
      //   await axios.post('http://localhost:5000/api/products', form);
      // }
      // setForm({name:'',price:0,description:'',image:'',category:'all',stock:0});
      // refresh();
    } catch (err) { 
      console.error(err); 
      showMessage('error', 'Có lỗi xảy ra!');
    }
  };

  const edit = (p) => {
    setEditingId(p.id);
    setForm({
      name: p.name,
      price: p.price,
      description: p.description,
      image: p.image,
      category: p.category,
      stock: p.stock || 0,
      originalPrice: p.originalPrice || 0,
      discount: p.discount || 0,
      rating: p.rating || 0,
      sizes: p.sizes || ['M'],
      colors: p.colors || ['Đen']
    });
  };

  const remove = async (id) => {
    try {
      // Mock delete - replace with actual API
      showMessage('success', 'Xóa sản phẩm thành công!');
      setDeleteDialog(null);
      refresh();
      
      // Uncomment for actual API:
      // await axios.delete('http://localhost:5000/api/products/' + id);
      // refresh();
    } catch (err) {
      console.error(err);
      showMessage('error', 'Có lỗi khi xóa sản phẩm!');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({
      name: '',
      price: 0,
      description: '',
      image: '',
      category: 'ao-thun',
      stock: 0,
      originalPrice: 0,
      discount: 0,
      rating: 0,
      sizes: ['M'],
      colors: ['Đen']
    });
  };

  return (
    <Container sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Quản Lý Sản Phẩm
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Tổng số sản phẩm: {products.length}
        </Typography>
      </Box>

      {/* Message Alert */}
      {message.text && (
        <Alert 
          severity={message.type} 
          sx={{ mb: 3 }}
          onClose={() => setMessage({ type: '', text: '' })}
        >
          {message.text}
        </Alert>
      )}

      {/* Product Form */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AddIcon />
            {editingId ? 'Cập Nhật Sản Phẩm' : 'Thêm Sản Phẩm Mới'}
          </Typography>
          
          <form onSubmit={submit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Tên sản phẩm"
                  value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                  required
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Danh mục"
                  select
                  value={form.category}
                  onChange={e => setForm({...form, category: e.target.value})}
                  required
                  margin="normal"
                >
                  {categories.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Giá (VNĐ)"
                  type="number"
                  value={form.price}
                  onChange={e => setForm({...form, price: Number(e.target.value)})}
                  required
                  margin="normal"
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Giá gốc (VNĐ)"
                  type="number"
                  value={form.originalPrice}
                  onChange={e => setForm({...form, originalPrice: Number(e.target.value)})}
                  margin="normal"
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Số lượng tồn kho"
                  type="number"
                  value={form.stock}
                  onChange={e => setForm({...form, stock: Number(e.target.value)})}
                  required
                  margin="normal"
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Đánh giá (0-5)"
                  type="number"
                  value={form.rating}
                  onChange={e => setForm({...form, rating: Number(e.target.value)})}
                  margin="normal"
                  InputProps={{ inputProps: { min: 0, max: 5, step: 0.1 } }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="URL hình ảnh"
                  value={form.image}
                  onChange={e => setForm({...form, image: e.target.value})}
                  margin="normal"
                  placeholder="https://example.com/image.jpg"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Mô tả sản phẩm"
                  value={form.description}
                  onChange={e => setForm({...form, description: e.target.value})}
                  multiline
                  rows={3}
                  margin="normal"
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    startIcon={editingId ? <EditIcon /> : <AddIcon />}
                  >
                    {editingId ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
                  </Button>
                  
                  {editingId && (
                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<CancelIcon />}
                      onClick={cancelEdit}
                    >
                      Hủy
                    </Button>
                  )}
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Danh Sách Sản Phẩm ({products.length})
          </Typography>
          
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'grey.100' }}>
                  <TableCell><strong>ID</strong></TableCell>
                  <TableCell><strong>Tên sản phẩm</strong></TableCell>
                  <TableCell><strong>Danh mục</strong></TableCell>
                  <TableCell><strong>Giá</strong></TableCell>
                  <TableCell><strong>Tồn kho</strong></TableCell>
                  <TableCell><strong>Đánh giá</strong></TableCell>
                  <TableCell><strong>Hành động</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow 
                    key={product.id}
                    sx={{ 
                      '&:last-child td, &:last-child th': { border: 0 },
                      backgroundColor: editingId === product.id ? 'action.hover' : 'inherit'
                    }}
                  >
                    <TableCell>{product.id}</TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight="medium">
                          {product.name}
                        </Typography>
                        {product.discount > 0 && (
                          <Chip 
                            label={`-${product.discount}%`} 
                            color="error" 
                            size="small" 
                            sx={{ mt: 0.5 }}
                          />
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={categories.find(c => c.value === product.category)?.label || product.category} 
                        variant="outlined" 
                        size="small" 
                      />
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight="bold" color="primary">
                          {product.price.toLocaleString()}₫
                        </Typography>
                        {product.originalPrice > product.price && (
                          <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                            {product.originalPrice.toLocaleString()}₫
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={product.stock} 
                        color={product.stock > 0 ? 'success' : 'error'}
                        variant="outlined"
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" color="warning.main">
                          ⭐ {product.rating}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          color="primary"
                          onClick={() => edit(product)}
                          size="small"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => setDeleteDialog(product)}
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {products.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                Chưa có sản phẩm nào
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!deleteDialog}
        onClose={() => setDeleteDialog(null)}
      >
        <DialogTitle>
          Xác nhận xóa sản phẩm
        </DialogTitle>
        <DialogContent>
          <Typography>
            Bạn có chắc chắn muốn xóa sản phẩm "{deleteDialog?.name}"?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Hành động này không thể hoàn tác.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(null)}>
            Hủy
          </Button>
          <Button 
            onClick={() => remove(deleteDialog.id)} 
            color="error"
            variant="contained"
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}