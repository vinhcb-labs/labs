
import re
from pathlib import Path
import streamlit as st
from streamlit.components.v1 import html as st_html

ROOT = Path(__file__).parent
ASSETS = ROOT / "assets"
PAGES = ROOT / "pages"

st.set_page_config(page_title="Labs Dashboard", layout="wide")

st.markdown("""
<style>
#MainMenu, header {visibility: hidden;}
footer {visibility: hidden;}
</style>
""", unsafe_allow_html=True)

st.markdown("### Labs Dashboard · Streamlit")

tabs = st.tabs(["Store", "Network", "System", "About"])

def load_css() -> str:
    p = ASSETS / "style.css"
    return p.read_text(encoding="utf-8") if p.exists() else ""

def load_page_html(filename: str) -> str:
    p = PAGES / filename
    html = p.read_text(encoding="utf-8")
    css = load_css()
    # If page already links style.css, keep it; also inject style inline to ensure isolation.
    if "<style>" in html:
        return f"<style>{css}</style>\n" + html
    else:
        return f"<style>{css}</style>\n" + html

def render_subpage(filename: str, height: int = 820):
    content = load_page_html(filename)
    st_html(content, height=height, scrolling=True)

with tabs[0]:
    render_subpage("store.html")

with tabs[1]:
    render_subpage("network.html")

with tabs[2]:
    render_subpage("system.html")

with tabs[3]:
    render_subpage("about.html")

st.caption("© Labs Tools • Built for fast, reliable on-call.")
