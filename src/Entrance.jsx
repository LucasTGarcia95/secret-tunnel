import { useAuth } from "./AuthContext";

export default function Entrance() {
  const { signup, error } = useAuth();

  function handleSignup(formData) {
    signup(formData);
  }

  return (
    <>
      <h1>Cave Entrance</h1>
      <p>Your journey has brought you to the base of a rocky mountain.</p>
      <p>
        The quickest path forward is through the mountain's winding tunnels, but
        a sturdy metal gate sits closed before you.
      </p>
      <p>
        Two giant badgers stand guard on either side of the gate, their eyes
        fixed on you. The one on the left opens its mouth, and with a deep,
        rumbling voice, it asks, "Who approaches? Speak your name."
      </p>

      {/* Error Message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form action={handleSignup}>
        <label>
          Name
          <input name="username" required />
        </label>
        <button>Respond</button>
      </form>
    </>
  );
}
