import Utilizator from '../models/User.js';

// Metoda creare user
async function createUser(RolId, user) {
    return await Utilizator.create({
        Email: user.Email,
        Password: user.Password,
        RolId: RolId
    });

}

// Metoda de preluare useri
async function getUsers() {
    try {
        return await Utilizator.findAll();
    }
    catch (e) {
        return e.message;
    }
}

// Metoda de preluare user dupa id
async function getUserById(id) {
    try {
        return await Utilizator.findByPk(id);
    }
    catch (e) {
        return e.message;
    }
}

// Metoda de update user dupa id
async function updateUser(id, user) {
    let updateElem = await Utilizator.findByPk(id);
    return await updateElem.update(user);

}

// Metoda de delete user dupa id
async function deleteUser(id) {
    let deleteElem = await Utilizator.findByPk(id);
    if (!deleteElem)
        return { hasErrors: true, message: "Nu exista utilizator cu acest id" };

    try {
        return await deleteElem.destroy();
    }
    catch (e) {
        let message = "This entity is already in use so it cannot be deleted";
        if (e.message.includes("FK_User_Rol")) {

            console.log(message);
            return message;

        } else if (e.message.includes("FK_User_Activitate")) {
            return "Utilizatorul nu poate fi sters, fiindca are activitati!"
        }
        else if (e.message.includes("FK_User_Feedback")) {
            return "Utilizatorul nu poate fi sters, fiindca a dat feedback!"
        }


        else throw (e);
    }
}
export { createUser, getUsers, getUserById, updateUser, deleteUser };