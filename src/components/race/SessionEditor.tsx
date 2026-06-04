/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { useDriverStore } from "../../store/useDriverStore";
import { teams } from "../../data/teams";
import type { Driver } from "../../types/Driver";

export default function SessionEditor({ isOpen, onClose, onSave, sessionData }: any) {
  const drivers: Driver[] = useDriverStore((s) => s.drivers);
  
  const [positions, setPositions] = useState<(string | null)[]>(Array(22).fill(null));
  const [dnf, setDnf] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      const saved = sessionData?.results || [];
      const pos = Array(22).fill(null);
      const dnfList: string[] = [];
      saved.forEach((res: any) => {
        if (res.position === "DNF") dnfList.push(res.driverId);
        else if (typeof res.position === 'number') pos[res.position - 1] = res.driverId;
      });
      setPositions(pos);
      setDnf(dnfList);
    }
  }, [isOpen, sessionData]);

  const handleSave = () => {
    const formattedPositions = positions
      .map((pId, i) => pId ? { driverId: pId, position: i + 1 } : null)
      .filter((p): p is { driverId: string; position: number } => p !== null);
      
    const formattedDnf = dnf.map(dId => ({ driverId: dId, position: "DNF" as const }));
    
    onSave(formattedPositions, formattedDnf);
  };

  const move = (idx: number, dir: number) => {
    const target = idx + dir;
    if (target < 0 || target >= 22) return;
    const newPos = [...positions];
    [newPos[idx], newPos[target]] = [newPos[target], newPos[idx]];
    setPositions(newPos);
  };

  const pool = drivers.filter(d => !positions.includes(d.id) && !dnf.includes(d.id));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      <div className="bg-[#111] border border-[#333] rounded-lg w-full max-w-5xl h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        
        <div className="p-4 border-b border-[#333] bg-[#181818] flex justify-between items-center">
          <h2 className="text-lg font-black text-red-600 uppercase">{sessionData?.label || "Editor"}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white font-bold text-xl">✕</button>
        </div>

        <div className="flex-1 overflow-hidden grid grid-cols-2 gap-0">
          <div className="overflow-y-auto p-4 border-r border-[#333]">
            <p className="text-[10px] text-gray-500 uppercase mb-2">Classificação Final</p>
            {positions.map((pId, idx) => {
              const d = pId ? drivers.find(dr => dr.id === pId) : null;
              const teamData = d ? teams.find(t => t.id === d.teamId) : null;
              
              return (
                <div key={idx} className="flex items-center gap-3 p-2 bg-[#1a1a1a] border border-[#222] rounded mb-1 h-14">
                  <span className="w-6 text-yellow-600 font-black text-sm">{idx + 1}</span>
                  {d ? (
                    <>
                      <div className="relative">
                        <img src={d.image} className="w-10 h-10 rounded-full border border-gray-700 object-cover" alt="" />
                        <span className="absolute -top-1 -right-1 bg-black text-[9px] text-white px-1 rounded-full border border-gray-500 font-bold">
                          {d.number}
                        </span>
                      </div>
                      
                      <div className="flex flex-col flex-1 justify-center">
                        <span className="text-sm font-bold leading-none">{d.lastName.toUpperCase()}</span>
                        {teamData && (
                          <div className="flex items-center gap-1 mt-1">
                            <img src={teamData.logo} className="w-3 h-3 object-contain" alt="" />
                            <span className="text-[9px] text-gray-500 uppercase">{teamData.name}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col">
                        <button onClick={() => move(idx, -1)} className="text-[8px] hover:text-white text-gray-500">▲</button>
                        <button onClick={() => move(idx, 1)} className="text-[8px] hover:text-white text-gray-500">▼</button>
                      </div>
                      <button onClick={() => setPositions(positions.map((p, i) => i === idx ? null : p))} className="text-red-500 px-3 font-bold">✕</button>
                    </>
                  ) : <span className="text-gray-800 italic text-xs pl-2">—</span>}
                </div>
              );
            })}
          </div>

          <div className="overflow-y-auto p-4 flex flex-col gap-6">
            <div>
              <p className="text-[10px] text-gray-500 uppercase mb-2">Disponíveis</p>
              {pool.map((d: Driver) => {
                const teamData = teams.find(t => t.id === d.teamId);
                
                return (
                  <div key={d.id} className="flex items-center gap-3 p-2 bg-[#1a1a1a] rounded mb-1 h-14 border border-transparent hover:border-[#333]">
                    <img src={d.image} className="w-10 h-10 rounded-full border border-gray-700 object-cover" alt="" />
                    
                    <div className="flex flex-col flex-1 justify-center">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold leading-none">{d.lastName}</span>
                        <span className="text-[10px] text-gray-500 font-bold">#{d.number}</span>
                      </div>
                      {teamData && (
                        <div className="flex items-center gap-1 mt-1">
                          <img src={teamData.logo} className="w-3 h-3 object-contain" alt="" />
                          <span className="text-[9px] text-gray-500 uppercase">{teamData.name}</span>
                        </div>
                      )}
                    </div>

                    <button onClick={() => {
                      const empty = positions.findIndex(p => p === null);
                      if (empty !== -1) {
                        const newPos = [...positions];
                        newPos[empty] = d.id;
                        setPositions(newPos);
                      }
                    }} className="text-primary text-[10px] font-bold px-3 py-1 border border-primary/30 rounded hover:bg-primary/10 transition-colors">ADD</button>
                    <button onClick={() => setDnf([...dnf, d.id])} className="text-red-600 text-[10px] font-bold px-3 py-1 border border-red-900 rounded hover:bg-red-900/20 transition-colors">DNF</button>
                  </div>
                );
              })}
            </div>

            <div>
              <p className="text-[10px] text-red-500 uppercase mb-2">DNF / Abandonaram</p>
              {dnf.map(dId => {
                const d = drivers.find(drv => drv.id === dId);
                if (!d) return null;
                const teamData = teams.find(t => t.id === d.teamId);

                return (
                  <div key={d.id} className="flex items-center gap-3 p-2 bg-red-950/20 border border-red-900 rounded mb-1 h-14">
                    <span className="text-red-500 font-black text-xs">DNF</span>
                    <img src={d.image} className="w-8 h-8 rounded-full object-cover" alt="" />
                    
                    <div className="flex flex-col flex-1 justify-center opacity-70">
                      <span className="text-sm font-bold leading-none">{d.lastName}</span>
                      {teamData && (
                        <div className="flex items-center gap-1 mt-1">
                          <img src={teamData.logo} className="w-3 h-3 object-contain" alt="" />
                          <span className="text-[9px] text-gray-400 uppercase">{teamData.name}</span>
                        </div>
                      )}
                    </div>

                    <button onClick={() => setDnf(dnf.filter(id => id !== d.id))} className="text-xs text-white hover:text-red-400">Remover</button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-[#333] bg-[#181818] flex gap-4">
          <button onClick={onClose} type="button" className="flex-1 py-3 border border-[#333] rounded text-xs font-bold hover:bg-[#222] transition-colors">CANCELAR</button>
          <button onClick={handleSave} type="button" className="flex-1 py-3 bg-red-600 rounded text-xs font-bold text-white hover:bg-red-700 transition-colors">SALVAR RESULTADO</button>
        </div>
      </div>
    </div>
  );
}