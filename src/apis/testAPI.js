import httpInstance from "@/utils/http";

function getCategory() {
  return httpInstance({
    url: "home/category/head",
  });
}

export { getCategory };
