export const exportToCSV = (vault) => {
  const headers = [
    "Name",
    "URL",
    "Username",
    "Password",
    "Note",
    "Category",
    "Favorite",
  ];

  const rows = vault.map((v) => [
    v.name,
    v.url,
    v.username,
    v.password,
    v.note,
    v.category,
    v.favorite ? "Yes" : "No",
  ]);

  const csv =
    [headers, ...rows]
      .map((r) =>
        r.map((v) => `"${v || ""}"`).join(",")
      )
      .join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "password-vault.csv";
  link.click();
};
