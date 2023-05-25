import React, { useState, useEffect } from "react";
import api from "../api";
import Modal from "react-modal";
import { toast } from "react-toastify";

import {
  Container,
  Product,
  ContentArea,
  ModalContent,
  ModalForm,
  ModalButton,
} from "./styles";
Modal.setAppElement("#root");

function App() {
  const [products, setProducts] = useState([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api({
        method: "GET",
        url: `/produtos`,
      });
      const fetchedProducts = response.data.map((product) => ({
        ...product,
        quantidade: 0,
        totalPrice: 0,
      }));
      setProducts(fetchedProducts);
      setFilteredProducts(fetchedProducts);
    } catch (error) {
      console.log("Erro ao buscar os produtos", error);
    }
  };

  const handleQuantidadeChange = (productId, quantidade) => {
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        const newQuantidade = product.quantidade + quantidade;
        if (newQuantidade >= 0) {
          const totalPrice = product.preco * newQuantidade;
          return {
            ...product,
            quantidade: newQuantidade,
            totalPrice: totalPrice,
          };
        }
      }
      return product;
    });

    setProducts(updatedProducts);
  };

  const handleAddProduct = async () => {
    try {
      await api({
        method: "POST",
        url: `/produtos`,
        data: {
          nome: nome,
          preco: parseFloat(preco),
          descricao: descricao,
        },
      });
      toast.success("Produto cadastrado com sucesso", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
      });
      closeModal();
      setNome("");
      setDescricao("");
      setPreco("");
    } catch (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
      });
    }
  };

  const handleProductDelete = async (productId) => {
    try {
      await api({
        method: "DELETE",
        url: `/produtos/${productId}`,
      });
      toast.success("Produto excluido com sucesso", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
      });
      const updatedProducts = products.filter(
        (product) => product.id !== productId
      );
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
    } catch (error) {
      console.log("Erro ao excluir o produto", error);
    }
  };

  useEffect(() => {
    let total = 0;
    products.forEach((product) => {
      if (product.preco && product.quantidade) {
        total += product.preco * product.quantidade;
      }
    });
    setTotalPrice(total);
  }, [products]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.nome &&
        product.nome.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [filter, products]);

  return (
    <Container>
      <input
        type="text"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Filtrar por nome do produto"
      />
      <ContentArea>
        {!filteredProducts.length ? (
          <h3>Nenhum produto encontrado</h3>
        ) : (
          filteredProducts.map((product) => (
            <Product key={product.id}>
              <h3 style={{ fontSize: "50px", color: "black" }}>
                {product.nome}
              </h3>
              <p>{product.descricao}</p>
              {product.preco && <p>Preço: R${product.preco.toFixed(2)}</p>}

              <div>
                <button onClick={() => handleQuantidadeChange(product.id, -1)}>
                  -
                </button>
                <span>{product.quantidade}</span>
                <button onClick={() => handleQuantidadeChange(product.id, 1)}>
                  +
                </button>
              </div>
              <button onClick={() => handleProductDelete(product.id)}>
                Excluir
              </button>
            </Product>
          ))
        )}
      </ContentArea>

      <button onClick={openModal}>Criar Produto</button>
      <p>Valor Total: R$ {totalPrice.toFixed(2)}</p>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            width: "400px",
            margin: "0 auto",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            border: "none",
          },
        }}
      >
        <ModalContent>
          <h2>Criar Produto</h2>
          <ModalForm onSubmit={handleAddProduct}>
            <div>
              <label htmlFor="name">Nome:</label>
              <input
                type="text"
                id="name"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="price">Preço:</label>
              <input
                type="number"
                id="price"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="description">Descrição:</label>
              <textarea
                id="description"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              ></textarea>
            </div>
            <ModalButton type="submit">Cadastrar Produto</ModalButton>
            <ModalButton type="button" onClick={closeModal}>
              Cancelar
            </ModalButton>
          </ModalForm>
        </ModalContent>
      </Modal>
    </Container>
  );
}

export default App;
