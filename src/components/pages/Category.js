import React, { useState, useEffect } from "react";
import { getCategorias } from "../../services/CategoryService";
import { MdLocalHospital, MdFastfood } from "react-icons/md";
import {
  FaCarSide,
  FaShoppingCart,
  FaBook,
  FaPeopleCarry,
  FaTrash,
  FaEdit,
  FaSave,
} from "react-icons/fa";
import {
  FaHouseChimney,
  FaMasksTheater,
  FaMoneyBillTransfer,
} from "react-icons/fa6";
import { GiPayMoney, GiReceiveMoney, GiTakeMyMoney } from "react-icons/gi";
import { IoMdAirplane } from "react-icons/io";
import { IoConstruct } from "react-icons/io5";

import styles from "./Category.module.css";
import IconGridSelector from "../layout/IconGridSelector";
import ColorPicker from "../layout/ColorPicker";

export default function Category() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  const [newItem, setNewItem] = useState("");
  const [selectedIcone, setSelectedIcone] = useState("");
  const [newCor, setNewCor] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [editedDescricao, setEditedDescricao] = useState("");
  const [editedIcone, setEditedIcone] = useState("");
  const [editedCor, setEditedCor] = useState("");

  // Ícones disponíveis
  const icons = {
    MdLocalHospital: <MdLocalHospital />,
    FaCarSide: <FaCarSide />,
    FaShoppingCart: <FaShoppingCart />,
    IoMdAirplane: <IoMdAirplane />,
    FaBook: <FaBook />,
    FaPeopleCarry: <FaPeopleCarry />,
    IoConstruct: <IoConstruct />,
    FaHouseChimney: <FaHouseChimney />,
    MdFastfood: <MdFastfood />,
    FaMoneyBillTransfer: <FaMoneyBillTransfer />,
    FaMasksTheater: <FaMasksTheater />,
    GiReceiveMoney: <GiReceiveMoney />,
    GiPayMoney: <GiPayMoney />,
    GiTakeMyMoney: <GiTakeMyMoney />,
  };

  useEffect(() => {
    async function carregarDados() {
      try {
        const categories = await getCategorias();
        setItems(categories);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        setErro(err.message);
      }
      setLoading(false);
    }

    carregarDados();
  }, []);

  // Adicionar novo item
  const handleAddItem = () => {
    if (newItem.trim() === "") return;
    const newItemObj = {
      id: Date.now(),
      descricao: newItem,
      icone: selectedIcone,
      cor: newCor,
    };
    setItems([...items, newItemObj]);
    setNewItem("");
    setSelectedIcone("");
    setNewCor("");
  };

  // Excluir item
  const handleDeleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // Iniciar edição
  const handleEditItem = (item) => {
    setEditingItem(item);
    setEditedDescricao(item.descricao);
    setEditedIcone(item.icone);
    setEditedCor(item.cor);
  };

  // Salvar edição
  const handleSaveEdit = () => {
    setItems(
      items.map((item) =>
        item.id === editingItem.id
          ? {
              ...item,
              descricao: editedDescricao,
              icone: editedIcone,
              cor: editedCor,
            }
          : item
      )
    );
    setEditingItem(null);
  };

  return (
    <div className={styles.mainContainer}>
      <h1>Categorias das Receitas e Despesas</h1>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className={`max-w-6xl mx-auto ${styles.box}`}>
          {erro ? (
            <p className="text-red-500">{erro}</p>
          ) : (
            <>
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  placeholder="Digite uma nova categoria..."
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                />
                <IconGridSelector
                  icons={icons}
                  selected={selectedIcone}
                  onSelect={(iconKey) => setSelectedIcone(iconKey)}
                />
                <ColorPicker
                  selectedColor={newCor}
                  onChange={setNewCor}
                />
                <button onClick={handleAddItem}>Adicionar</button>
              </div>
              <ul className={styles.itemList}>
                {items.map((item) => (
                  <li key={item.id} className={styles.item}>
                    {editingItem && editingItem.id === item.id ? (
                      <>
                        <input
                          type="text"
                          value={editedDescricao}
                          onChange={(e) => setEditedDescricao(e.target.value)}
                        />
                        <IconGridSelector
                          icons={icons}
                          selected={editedIcone}
                          onSelect={(iconKey) => setEditedIcone(iconKey)}
                        />
                        <ColorPicker
                          selectedColor={editedCor}
                          onChange={setEditedCor}
                        />
                        <button onClick={handleSaveEdit} className="save">
                          <FaSave />
                        </button>
                      </>
                    ) : (
                      <>
                        <span
                          style={{
                            backgroundColor: item.cor,
                            padding: "5px",
                            borderRadius: "5px",
                          }}
                        >
                          {icons[item.icone]} {item.descricao}
                        </span>
                        <div className={styles.buttons}>
                          <button
                            onClick={() => handleEditItem(item)}
                            className="edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
