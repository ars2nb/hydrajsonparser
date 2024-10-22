downloadJson = async (url) => {
   try {
      const response = await fetch(url);

      if (!response.ok) {
         const errorMessage = "Error downloading JSON file.";
         alert(errorMessage);
         throw new Error(errorMessage);
      }

      const json = response.json();
      console.log(json);
      return json;
   } catch (error) {
      const errorMessage = `Could not download JSON file: ${error}`;
      alert(errorMessage);
      throw new Error(errorMessage);
   }
};

parseJson = (json) => {
   if (typeof json.name === "undefined" || typeof json.downloads === "undefined") {
      const errorMessage = "JSON is missing 'name' or 'downloads' field.";
      alert(errorMessage);
      throw new Error(errorMessage);
   }
   const parsedData = {
      name: "",
      downloads: [],
   };

   parsedData.name = json.name;

   json.downloads.forEach((download) => {
      const item = {
         title: "",
         size: "",
      };

      item.title = download.title;
      item.size = download.fileSize.slice(-10);

      parsedData.downloads.push(item);
   });

   console.log(parsedData);
   return parsedData;
};

renderParsedJson = (parsedJson) => {
   const tableTitle = document.getElementById("tableTitle");
   const tableBody = document.getElementById("tableBody");

   tableBody.replaceChildren();
   tableTitle.textContent = parsedJson.name;

   parsedJson.downloads.forEach((download, index) => {
      const tr = document.createElement("tr");
      const tdNumber = document.createElement("td");
      const tdTitle = document.createElement("td");
      const tdSize = document.createElement("td");

      tdNumber.textContent = index + 1;
      tdNumber.classList.add("titleNumber");
      tdTitle.textContent = download.title;
      tdTitle.classList.add("titleText");
      tdSize.textContent = download.size;
      tdSize.classList.add("titleSize");

      tr.appendChild(tdNumber);
      tr.appendChild(tdTitle);
      tr.appendChild(tdSize);
      tableBody.appendChild(tr);
   });
};

downloadFormHandler = async (event) => {
   event.preventDefault();
   const url = document.getElementById("jsonLinkInput").value;
   const json = await downloadJson(url);
   const parsedJson = parseJson(json);
   renderParsedJson(parsedJson);
};

document.onreadystatechange = () => {
   if (document.readyState === "complete") {
      document.getElementById("downloadForm").addEventListener("submit", (event) => downloadFormHandler(event));
   }
};
