const url = "https://post-it.epi-bluelock.bj/notes";

/**
 * get() : fonction de récupération des Notes via fetch API
 * @returns errorMessage en cas d'erreur lors de la requête ou response.notes si aucune erreur ne survient
 */
export async function get() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      // fetch ne prend pas par défaut les codes 4.. et 5.. comme des erreurs
      throw new Error(
        `Erreur: ${response.status} - La ressource n'a pas pu être trouvée.`
      );
    }
    const data = await response.json();
    return data.notes;
  } catch (error) {
    console.error("Error (Fetch) : ", error.message);
    let errorMessage = null;
    // verifier si l'erreur est liée à la connexion internet
    if (error.message.includes("Failed to fetch")) {
      errorMessage = "Erreur réseau. Vérifiez votre connexion Internet.";
    } else {
      errorMessage = error.message;
    }
    return errorMessage;
  }
}

/**
 * post() : fonction de création de Note via FetchApi
 * @param {*} note : note à créer sous format d'objet
 * @returns errorMessage en cas d'erreur lors de la requête ou response.notes si aucune erreur ne survient
 */
export async function post(note) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    });
    if (!response.ok) {
      throw new Error(
        `Erreur: ${response.status} - L'enregistrement a échoué.`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error (Fetch) : ", error.message);
    let errorMessage = null;
    // verifier si l'erreur est liée à la connexion internet
    if (error.message.includes("Failed to fetch")) {
      errorMessage = "Erreur réseau. Vérifiez votre connexion Internet.";
    } else {
      errorMessage = error.message;
    }
    return errorMessage;
  }
}

/**
 * put() : fonction de modification de Note vias Fectch Api
 * @param {*} id : _id de la note à modifier
 * @param {*} note : note à modifier sous former d'objet
 * @returns errorMessage en cas d'erreur lors de la requête ou response.notes si aucune erreur ne survient
 */
export async function put(id, note) {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    });
    if (!response.ok) {
      throw new Error(`Erreur: ${response.status} - La modification a échoué.`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error (Fetch) : ", error.message);
    let errorMessage = null;
    // verifier si l'erreur est liée à la connexion internet
    if (error.message.includes("Failed to fetch")) {
      errorMessage = "Erreur réseau. Vérifiez votre connexion Internet.";
    } else {
      errorMessage = error.message;
    }
    return errorMessage;
  }
}

/**
 * destroy() : fonction de suppression de note via Fetch Api
 * @param {*} id : _id de la note à supprimer
 * @returns errorMessage en cas d'erreur lors de la requête ou response.notes si aucune erreur ne survient
 */
export async function destroy(id) {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Erreur: ${response.status} - La suppression a échoué.`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error (Fetch) : ", error.message);
    let errorMessage = null;
    // verifier si l'erreur est liée à la connexion internet
    if (error.message.includes("Failed to fetch")) {
      errorMessage = "Erreur réseau. Vérifiez votre connexion Internet.";
    } else {
      errorMessage = error.message;
    }
    return errorMessage;
  }
}
/**
 * Ressource : https://kodaschool.com/blog/best-practices-for-fetching-data-in-vue-js
 */
