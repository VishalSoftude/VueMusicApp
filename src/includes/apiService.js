import axios from 'axios';
import { api } from './constant';
export default {
  async FetchProductDetails(searchText, pageNo, noOfDataToShow, orderBy) {
    console.log(
      'searchText, pageNo, noOfDataToShow, orderBy: ',
      searchText,
      pageNo,
      noOfDataToShow,
      orderBy
    );
    console.log(api.getApi);
    const apiUrl = `${api.getApi}`;
    // var fetchData = (apiUrl) => {
    var data = await axios
      .post(apiUrl, {
        searchText: searchText,
        pageNo: pageNo,
        noOfDataToShow: noOfDataToShow,
        orderBy: orderBy
      })
      .then((response) => {
        return response;
        //console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    return data;
    // };
    // return fetch(apiUrl)
    //   .then((response) => {
    //     //response.json();
    //     //console.log('JSON RESPONSE', response.json());
    //     return response.json();
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  },
  async FetchImages() {
    const accessKey = '3MDhYvNo-LW6TedlzBIFs4q8UDatVXN-L7y2_6K8Jgg';
    const apiUrl = `https://api.unsplash.com/photos/random/?count=50&client_id=${accessKey}`;

    var images = await axios
      .get(apiUrl)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log('error', error);
      });
    return images;
  }
};
