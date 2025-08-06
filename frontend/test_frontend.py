from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

# Chrome browser open karein
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

# Apne frontend app ka URL yahan daalein (agar local hai to)
driver.get("http://localhost:3000")

# Page title print karein
print("Page title is:", driver.title)

# Browser band karein
driver.quit() 