var openModalBtn = $(".add-item");
var modal = $(".notebook-modal-container");
var notebookList = [];

openModalBtn.click(function () {

  modal.css("display", "block");

  var closeModalBtn = modal.find(".close");
  var createItem = modal.find(".create");
  console.log("createItem1", createItem);

  closeModalBtn.click(function() {
    modal.hide();
  });
  // console.log("createItem");
  createItem.click(createNotebook);
});

function refreshNotebookList() {
  var itemList = $("<ul></ul>");
  notebookList.forEach(function(item) {
    itemList.append("<li>" + item.title + "</li>");
    $(".notebook-section").html(itemList);
  });

}


function createNotebook() {
  var notebookTitle = modal.find("input").val();
  console.log("aaa");
  // axios.post("/notebooks", {
  //   title: notebookTitle,
  // }).then(onSuccess, onError);
  onSuccess({id: 1});
  function onSuccess(response) {

    notebookList.push({
      id: response.id,
      title: notebookTitle
    });
    console.log(notebookList);
    refreshNotebookList();
    modal.hide();

  }
  function onError(error) {
    alert(error);
  }
}
