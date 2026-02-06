import { useState } from "react";
import ueLogo from "./assets/ue-logo.png";

// Fake async function to simulate fetching students from an API
const fetchStudents = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "Alice", score: 85 },
        { id: 2, name: "Bob", score: 92 },
        { id: 3, name: "Charlie", score: 78 },
        { id: 4, name: "Diana", score: 95 }
      ]);
    }, 1000);
  });
};

const classifyScore = (score) => {
  if (score >= 90) return "Excellent";
  if (score >= 80) return "Good";
  return "Needs Improvement";
};

// TASK 1 & 2: Updated Student component with onLog and onRemove props
const Student = ({ id, name, score, onLog, onRemove }) => {
  const category = classifyScore(score);
  const isExcellent = score >= 90;

  return (
    <div style={{
      border: "1px solid #D4A0A0",
      marginBottom: "8px",
      padding: "16px",
      borderRadius: "8px",
      backgroundColor: "#FFF5F5"
    }}>
      <h3 style={{ margin: "0 0 8px 0", color: "#A51C30" }}>{name}</h3>
      <p style={{ margin: "4px 0" }}>Score: <strong>{score}</strong></p>
      <p style={{ margin: "4px 0" }}>Category: <strong>{category}</strong></p>
      {isExcellent && (
        <p style={{ 
          color: "#A51C30",
          fontWeight: "bold",
          margin: "8px 0 0 0" 
        }}>
          🌟 Excellent!
        </p>
      )}
      
      {/* TASK 1: Log Name button */}
      <div style={{ marginTop: "12px" }}>
        <button 
          onClick={() => onLog(name)}
          style={{
            padding: "6px 12px",
            fontSize: "14px",
            backgroundColor: "#A51C30",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginRight: "8px"
          }}
        >
          Log Name
        </button>
        
        {/* TASK 2: Remove button */}
        <button 
          onClick={() => onRemove(id)}
          style={{
            padding: "6px 12px",
            fontSize: "14px",
            backgroundColor: "#7A1525",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [students, setStudents] = useState([]);
  const [newName, setNewName] = useState("");
  const [newScore, setNewScore] = useState("");
  const [search, setSearch] = useState("");
  const [showPassingOnly, setShowPassingOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // PART E: Async load students handler
  const handleLoadStudents = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchStudents();
      setStudents(data);
    } catch {
      setError("Failed to load students");
    } finally {
      setIsLoading(false);
    }
  };

  // TASK 1: Function to log student name
  const handleLogName = (name) => {
    console.log("Student name:", name);
  };

  // TASK 2: Function to remove student
  const handleRemoveStudent = (id) => {
    // Confirm before deleting
    const studentToRemove = students.find(s => s.id === id);
    if (window.confirm(`Are you sure you want to remove ${studentToRemove.name}?`)) {
      setStudents((prev) => prev.filter((student) => student.id !== id));
    }
  };

  const handleAddStudent = () => {
    const scoreNumber = Number(newScore);
    
    if (!newName.trim()) {
      alert("Please enter a student name!");
      return;
    }
    
    if (Number.isNaN(scoreNumber) || newScore === "") {
      alert("Please enter a valid score!");
      return;
    }
    
    if (scoreNumber < 0 || scoreNumber > 100) {
      alert("Score must be between 0 and 100!");
      return;
    }

    const newStudent = {
      id: Date.now(),
      name: newName.trim(),
      score: scoreNumber
    };

    setStudents([...students, newStudent]);
    setNewName("");
    setNewScore("");
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const isPassing = student.score >= 80;
    return showPassingOnly ? matchesSearch && isPassing : matchesSearch;
  });

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddStudent();
    }
  };

  return (
    <div style={{
      padding: "0",
      maxWidth: "600px",
      margin: "0 auto",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#FFFFFF"
    }}>
      {/* UE Branded Header */}
      <div style={{
        backgroundColor: "#A51C30",
        color: "white",
        padding: "20px",
        textAlign: "center",
        borderRadius: "8px 8px 0 0"
      }}>
        <img
          src={ueLogo}
          alt="University of the East Logo"
          style={{ width: "80px", height: "80px", marginBottom: "8px" }}
        />
        <h1 style={{ color: "white", margin: "0", fontSize: "24px" }}>
          Student Dashboard
        </h1>
        <p style={{ margin: "4px 0 0 0", fontSize: "14px", opacity: 0.9 }}>
          University of the East
        </p>
      </div>

      <div style={{ padding: "20px" }}>

      {/* Load Students Button */}
      <div style={{ marginBottom: "16px", textAlign: "center" }}>
        <button
          onClick={handleLoadStudents}
          disabled={isLoading}
          style={{
            padding: "10px 24px",
            fontSize: "16px",
            backgroundColor: isLoading ? "#D4A0A0" : "#A51C30",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: isLoading ? "not-allowed" : "pointer"
          }}
        >
          {isLoading ? "Loading..." : "Load Students"}
        </button>
      </div>

      {isLoading && (
        <p style={{ textAlign: "center", color: "#A51C30", fontWeight: "bold" }}>
          Loading students...
        </p>
      )}

      {error && (
        <p style={{ textAlign: "center", color: "#A51C30", fontWeight: "bold" }}>
          {error}
        </p>
      )}

      {/* Add Student Form */}
      <div style={{
        marginBottom: "24px",
        padding: "16px",
        backgroundColor: "#FFF0F0",
        borderRadius: "8px",
        border: "1px solid #D4A0A0"
      }}>
        <h2 style={{ marginTop: 0, color: "#A51C30" }}>Add Student</h2>
        
        <div style={{ marginBottom: "12px" }}>
          <input
            placeholder="Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyPress={handleKeyPress}
            style={{
              padding: "8px",
              fontSize: "16px",
              width: "100%",
              boxSizing: "border-box",
              borderRadius: "4px",
              border: "1px solid #D4A0A0"
            }}
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <input
            placeholder="Score (0-100)"
            type="number"
            value={newScore}
            onChange={(e) => setNewScore(e.target.value)}
            onKeyPress={handleKeyPress}
            min="0"
            max="100"
            style={{
              padding: "8px",
              fontSize: "16px",
              width: "100%",
              boxSizing: "border-box",
              borderRadius: "4px",
              border: "1px solid #D4A0A0"
            }}
          />
        </div>

        <button
          onClick={handleAddStudent}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#A51C30",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Add Student
        </button>
      </div>

      {/* Search and Filter */}
      <div style={{ marginBottom: "16px" }}>
        <input
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px",
            fontSize: "16px",
            width: "60%",
            borderRadius: "4px",
            border: "1px solid #D4A0A0"
          }}
        />
        <label style={{ marginLeft: "8px" }}>
          <input
            type="checkbox"
            checked={showPassingOnly}
            onChange={(e) => setShowPassingOnly(e.target.checked)}
          />
          Show passing only
        </label>
      </div>

      {/* Student list */}
      <div>
        <h2 style={{ color: "#A51C30" }}>All Students ({filteredStudents.length})</h2>
        {filteredStudents.length === 0 ? (
          <p style={{ textAlign: "center", color: "#999", padding: "20px" }}>
            No students found.
          </p>
        ) : (
          filteredStudents.map((student) => (
            <Student
              key={student.id}
              id={student.id}
              name={student.name}
              score={student.score}
              onLog={handleLogName}
              onRemove={handleRemoveStudent}
            />
          ))
        )}
      </div>
      </div>
    </div>
  );
};

export default App;