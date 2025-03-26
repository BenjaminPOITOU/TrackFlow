export function Dashboard() {
  // ... (votre code existant)

  return (
    <div className="space-y-8 bg-background">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">DASHBOARD_SYS</h1>
          <p className="text-muted-foreground">WELCOME_TO_CREATIVE_SPACE</p>
        </div>
        <Button
          className="border border-border/50 bg-card hover:bg-card/80 text-foreground shadow-sm"
          onClick={() => setShowNewProjectModal(true)}
        >
          <Plus className="mr-2 h-4 w-4" /> NEW_PROJECT
        </Button>
      </div>

      {/* Lecteur audio avec fond ultra clair */}
      <div className="bg-card border border-border/30 rounded-lg p-4 shadow-sm">
        <AudioPlayer />
      </div>

      {/* Projets récents */}
      <div className="bg-card border border-border/30 rounded-lg p-4 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-foreground">RECENT_PROJECTS</h2>
          <Button 
            variant="ghost"
            className="text-xs text-muted-foreground hover:bg-background"
          >
            VIEW_ALL →
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      {/* Compositions récentes */}
      <div className="bg-card border border-border/30 rounded-lg p-4 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-foreground">RECENT_COMPOSITIONS</h2>
          <Button 
            variant="ghost"
            className="text-xs text-muted-foreground hover:bg-background"
          >
            VIEW_ALL →
          </Button>
        </div>
        <div className="divide-y divide-border/20">
          {recentCompositions.map((composition) => (
            <CompositionItem key={composition.id} composition={composition} />
          ))}
        </div>
      </div>

      {/* Annotations récentes */}
      <div className="bg-card border border-border/30 rounded-lg p-4 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-foreground">RECENT_ANNOTATIONS</h2>
          <Button 
            variant="ghost"
            className="text-xs text-muted-foreground hover:bg-background"
          >
            VIEW_ALL →
          </Button>
        </div>
        <div className="divide-y divide-border/20">
          {recentAnnotations.map((annotation) => (
            <AnnotationItem key={annotation.id} annotation={annotation} />
          ))}
        </div>
      </div>

      {showNewProjectModal && <NewProjectModal onClose={() => setShowNewProjectModal(false)} />}
    </div>
  )
}