import React from 'react';
import { LayoutDashboard, Map, TrendingUp } from 'lucide-react';

const Layout = ({ children }) => {
    return (
        <div className="app-layout">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <div className="sidebar-title">역세권 실거래</div>
                    <div className="sidebar-subtitle">Metropolitan Subway Data</div>
                </div>

                <nav className="sidebar-nav">
                    <NavItem icon={<LayoutDashboard size={20} />} label="대시보드" active />
                    <NavItem icon={<Map size={20} />} label="지도 보기" />
                    <NavItem icon={<TrendingUp size={20} />} label="가격 추세" />
                </nav>

                <div className="sidebar-footer">© 2026 BigData Transport</div>
            </aside>

            <main className="main-content">
                <header className="main-header">
                    <div className="main-header-title">대시보드 개요</div>
                    <div className="avatar">U</div>
                </header>
                <div className="content-area">
                    {children}
                </div>
            </main>
        </div>
    );
};

const NavItem = ({ icon, label, active }) => (
    <button className={`nav-item ${active ? 'active' : ''}`}>
        {icon}
        <span>{label}</span>
    </button>
);

export default Layout;
