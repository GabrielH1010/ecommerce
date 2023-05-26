import React, { useState, useEffect } from "react";
import api from "../api";
import Modal from "react-modal";
import { toast } from "react-toastify";

import {
  Header,
  Container,
  Product,
  ContentArea,
  ModalContent,
  ModalForm,
} from "./styles";
import { black, blue, red } from "../styles/colorProvider";
import { Button, Input } from "../components";
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
      const precoValue =
        typeof preco === "string"
          ? preco.replace("R$", "").replace(",", ".")
          : preco;
      await api({
        method: "POST",
        url: `/produtos`,
        data: {
          nome: nome,
          preco: parseFloat(precoValue),
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
      fetchProducts();
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
    setNome("");
    setDescricao("");
    setPreco("");
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
      <Header>
        <div className="contentArea">
          <Input
            type="text"
            value={filter}
            onChange={handleFilterChange}
            placeholder="Filtrar por nome do produto"
          />

          <p>Total: R$ {totalPrice.toFixed(2)}</p>
        </div>
      </Header>
      <h3 style={{ fontSize: "32px", color: `${black}` }}>Lista de produtos</h3>
      <ContentArea>
        {!filteredProducts.length ? (
          <h3>Nenhum produto encontrado</h3>
        ) : (
          filteredProducts.map((product) => (
            <Product key={product.id}>
              <h3>{product.nome}</h3>
              <p>{product.descricao}</p>
              {product.preco && <p>R${product.preco.toFixed(2)}</p>}

              <div className="button-container">
                <button
                  style={{ backgroundColor: `${red}` }}
                  onClick={() => handleQuantidadeChange(product.id, -1)}
                >
                  -
                </button>
                <span>{product.quantidade}</span>
                <button
                  style={{ backgroundColor: `${blue}` }}
                  onClick={() => handleQuantidadeChange(product.id, 1)}
                >
                  +
                </button>
              </div>
              <p
                className="delete"
                onClick={() => handleProductDelete(product.id)}
              >
                Excluir
              </p>
            </Product>
          ))
        )}
      </ContentArea>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            width: "400px",
            height: "420px",
            margin: "0 auto",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            border: "none",
          },
        }}
      >
        <ModalContent>
          <h1>Cadastrar produto</h1>
          <ModalForm>
            <Input
              placeholder="Nome do produto"
              type="text"
              id="name"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <Input
              placeholder="Preço do produto"
              numeric
              price
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
            />
            <textarea
              id="description"
              placeholder="Descrição do produto"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            ></textarea>
            <Button
              style={{ marginTop: "25px", backgroundColor: `${blue}` }}
              onClick={handleAddProduct}
              disabled={!nome || !descricao || !preco}
            >
              Cadastrar
            </Button>
            <Button
              style={{ color: `${red}` }}
              outlined
              type="button"
              onClick={closeModal}
            >
              Cancelar
            </Button>
          </ModalForm>
        </ModalContent>
      </Modal>
      <Button
        onClick={openModal}
        style={{ margin: "50px 0", backgroundColor: `${blue}` }}
      >
        Criar Produto
      </Button>
    </Container>
  );
}

export default App;
