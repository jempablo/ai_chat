fetch("/api/user")
  .then(res => res.json())
  .then(data => {
     console.log("Current ERP user:", data.user);
  });
