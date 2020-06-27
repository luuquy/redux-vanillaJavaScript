console.log(window.Redux);

const { createStore } = window.Redux;

//state

//reducer

//store

const initialState = JSON.parse(localStorage.getItem("list")) || [];
const hobbyReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_HOBBY": {
      const newList = [...state];
      newList.push(action.payload);

      return newList;
    }
    default:
      return state;
  }
};

const store = createStore(hobbyReducer);

//render redux hobby list

const renderHobbyList = (hobbyList) => {
  if (!Array.isArray(hobbyList) || hobbyList.length === 0) return;

  const ulElement = document.querySelector("#hobbyListId");
  if (!ulElement) return;

  //reset previous content of ul

  ulElement.innerHTML = "";

  for (const hobby of hobbyList) {
    const liElement = document.createElement("li");
    liElement.textContent = hobby;

    ulElement.appendChild(liElement);
  }
};

//render initial hobby list

const initialHobbyList = store.getState();
console.log(initialHobbyList);

renderHobbyList(initialHobbyList);

//handle form submit

const hobbyForm = document.querySelector("#hobbyFormId");

if (hobbyForm) {
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const hobbyTextElement = hobbyForm.querySelector("#hobbyTextId");
    if (!hobbyTextElement) return;

    console.log("xx", hobbyTextElement.value);
    const action = {
      type: "ADD_HOBBY",
      payload: hobbyTextElement.value,
    };
    store.dispatch(action);

    //reset
    hobbyForm.reset();
  };
  hobbyForm.addEventListener("submit", handleFormSubmit);
}

store.subscribe(() => {
  console.log("State update", store.getState());
  const newHobbyList = store.getState();
  renderHobbyList(newHobbyList);

  localStorage.setItem("list", JSON.stringify(newHobbyList));
});
