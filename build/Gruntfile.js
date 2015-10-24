
module.exports = function (grunt) {
	grunt.initConfig(
			{
				pkg: grunt.file.readJSON('package.json'),
				concat:
				{
					build:
					{
						src:
						[
							"../src/init.js",
							"../src/Digraph/Arc.js",
							"../src/Digraph/Vertex.js",
							"../src/Digraph/Digraph.js",
							"../src/Events/EventDispatcher.js",
							"../src/Events/OutputEvent.js",
							"../src/Events/BaseModelEvent.js",
							"../src/Model/Output.js",
							"../src/Model/BaseModel.js",
							"../src/Visualization/VisualError.js",
							"../src/Visualization/Particle.js",
							"../src/Visualization/Segment.js",
							"../src/Visualization/Chain.js",
							"../src/Visualization/Visualization.js",
						],
						dest: 'output/CircuitViz-<%= pkg.version %>.js'
					}
				},
				 uglify:
				 {
					options: 
					{
						sourceMap: true,
						mangle: true,
					},
					main:
					{
						files:
						{
							'output/CircuitViz-<%= pkg.version %>.min.js':'output/CircuitViz-<%= pkg.version %>.js',
						}
					}
				}
	});
	grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	
	grunt.registerTask('build', ["concat","uglify",]);

};
