const urlToken = async () => {
  const url = 'https://opentdb.com/api_token.php?command=request';
  const request = await fetch(url);
  const response = await request.json();
  return response.token;
};

export default urlToken;
