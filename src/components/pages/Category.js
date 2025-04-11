import React, { useState, useEffect, useMemo } from "react";
import { getCategorias } from "../../services/CategoryService";
import { MdLocalHospital, MdFastfood } from "react-icons/md";
import { TbArrowNarrowDown, TbArrowNarrowUp } from "react-icons/tb";
import {
  FaCarSide,
  FaShoppingCart,
  FaBook,
  FaPeopleCarry,
  FaTrash,
  FaEdit,
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
  const [filtro, setFiltro] = useState({
    descricao: "",
  });
  const [ordem, setOrdem] = useState("descricao");
  const [ascendente, setAscendente] = useState(true);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  const [newItem, setNewItem] = useState("");
  const [selectedIcone, setSelectedIcone] = useState("");
  const [newCor, setNewCor] = useState("");

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

  const dadosFiltrados = useMemo(() => {
    let resultado = [...items];

    // Filtro
    resultado = resultado.filter((item) =>
      Object.entries(filtro).every(([chave, valor]) =>
        valor === ""
          ? true
          : String(item[chave]).toLowerCase().includes(valor.toLowerCase())
      )
    );

    // Ordenação
    if (ordem) {
      resultado.sort((a, b) => {
        const valorA = a[ordem];
        const valorB = b[ordem];
        if (valorA < valorB) return ascendente ? -1 : 1;
        if (valorA > valorB) return ascendente ? 1 : -1;
        return 0;
      });
    }

    return resultado;
  }, [items, filtro, ordem, ascendente]);

  const alternarOrdem = (campo) => {
    if (ordem === campo) {
      setAscendente(!ascendente);
    } else {
      setOrdem(campo);
      setAscendente(true);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <h1>Categorias das Receitas e Despesas</h1>
      <div className={styles.inputContainer}>
        <input
          className={styles.filterInput}
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
        <ColorPicker selectedColor={newCor} onChange={setNewCor} />
        <button onClick={handleAddItem}>Adicionar</button>
      </div>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className={styles.container}>
          {erro ? (
            <p className="text-red-500">{erro}</p>
          ) : (
            <div className={styles.box}>
              <table className={styles.table}>
                <thead className={styles.thead}>
                  <tr>
                    {["descricao"].map((campo) => (
                      <th
                        colSpan={2}
                        key={campo}
                        className={styles.th}
                        onClick={() => alternarOrdem(campo)}
                      >
                        {campo.toUpperCase()}
                        {ordem === campo &&
                          (ascendente ? (
                            <TbArrowNarrowUp />
                          ) : (
                            <TbArrowNarrowDown />
                          ))}
                      </th>
                    ))}
                  </tr>
                  <tr className={styles.filterRow}>
                    {["descricao"].map((campo) => (
                      <td key={campo} colSpan={2}>
                        <input
                          type="text"
                          placeholder={`Filtrar ${campo}`}
                          className={styles.filterInput}
                          value={filtro[campo]}
                          onChange={(e) =>
                            setFiltro({ ...filtro, [campo]: e.target.value })
                          }
                        />
                      </td>
                    ))}
                  </tr>
                </thead>
                <tbody className={styles.fadeEnter}>
                  {dadosFiltrados.map((item, index) => (
                    <tr key={index} className={styles.row}>
                      <td className={styles.td}>
                        <span
                          style={{
                            backgroundColor: item.cor,
                            padding: "5px",
                            borderRadius: "5px",
                          }}
                        >
                          {icons[item.icone]} {item.descricao}
                        </span>
                      </td>
                      <td className={styles.td}>
                        <div className={styles.buttons}>
                          <button className="edit">
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
